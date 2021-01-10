// Create a "More Jobs" button at end of job posts to change pagination/page number (plus 1)


// GitJobs Name Space
  const app = () => {};
  
  // Get data from GitHub Jobs API
  app.getJobData = (search = '', location = 'Canada', fullTime = false, page = 0) => {
    const proxyurl = 'https://ancient-oasis-20473.herokuapp.com/';
    const url = new URL(`https://jobs.github.com/positions.json?`);
    const params = new URLSearchParams(url);

    params.set('search', search);
    params.set('location', location);
    params.set('full_time', fullTime);
    params.set('page', page);

    params.toString();
    console.log(proxyurl + url + params);
    
    fetch(proxyurl + url + params)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + 
          response.status);
          return;
        }
        response.json().then(function(data) {
          app.removePostings();
          app.displayJobs(data);
          console.log(data);
        });
      }
      )
      .catch(function(err) {
        console.log('Fetch Error', err);
      });
    };

    // Listens for search bar inputs
    app.handleSearchBar = () => {
      const form = document.querySelector('#searchForm')
            
      function submitForm(event) {
        event.preventDefault();
        const search = document.querySelector('#search').value;
        const location = document.querySelector('#location').value;

        let fullTime = document.querySelector('#fullTime');
        if (fullTime.checked) {
          fullTime = true
        } else {
          fullTime = false
        };
                
        app.getJobData(search, location, fullTime);
      }
      
      form.addEventListener('submit', submitForm);
    };
    
    app.handleSearchBar();

    // Clear .jobPostings placeholder
    app.removePostings = () => {
      const jobPostings = document.querySelector('.jobPostings');
      jobPostings.innerHTML = '';
    };

    // Destructure API data into variables with HTML literals
    app.displayJobs = (jobData) => {
      const posts = [];
      let postID = 0;
      
      jobData.forEach(job => {
        const { 
          company,
          company_logo, 
          company_url, 
          created_at, 
          description, 
          how_to_apply, 
          id, 
          location, 
          title, 
          type, 
          url 
        } = job;

        // Trim down date
        const created = created_at.substr(0,9);

        const jobPost = `
          <div class="jobPost" data-id="${postID}">
            <img src="${company_logo}" alt="Logo for ${company}"></img>
            <p>${created} - </p>
            <p>${type}</p>
            <p>${title}</p>
            <p>${company}</p>
            <p>${location}</p>
          </div>
        `;

        const jobDetails = `
          <div class="jobHeader">
            <img src="${company_logo}" alt="Logo for ${company}"></img>
            <p>${company}</p>
            <p>${company_url}</p>
            <a href="${company_url}">Company Site</a>
          </div>

          <div class="jobDetails">
            <p>${created} - </p>
            <p>${type}</p>
            <p>${title}</p>
            <p>${location}</p>
            ${how_to_apply}
            <p>${description}</p>
            <p>Job Posting ID: ${id}</p>
          </div>
        `

        posts.push(jobDetails);
        postID++;

        app.displayJobPosts(jobPost);
      });

      app.handleJopPostClick(posts);
    }

    // Populate .jobPostings with jobPost
    app.displayJobPosts = (jobPost) => {
      const jobPostings = document.querySelector('.jobPostings');
      jobPostings.insertAdjacentHTML('beforeend', jobPost);
    };
    
    // Listens for .jobPost click and passes on clicked ID 
    app.handleJopPostClick = (posts) => {
      const jobPosts = document.querySelectorAll('.jobPost');
      
      // Clears .jobDetails to prepare for new details
      function removeDetails() {
        const jobDescription = document.querySelector('.jobDescription');
        jobDescription.innerHTML = '';
      }

      function showDetails(event) {    

        removeDetails();
        const clickedJobPost = event.currentTarget;
        const clickedJobID = clickedJobPost.attributes[1].value;
        
        // Toggle border around the active post
        function toggleBorder() {
          const activePost = document.querySelector('.activeJobPost');
          if(activePost !==null) {
            activePost.classList.remove('activeJobPost')
          };
          clickedJobPost.classList.toggle('activeJobPost');
        };
        
        // Uses clicked ID to render appropriate details in .jobDetails
        function renderDetails(jobID, posts) {
          const jobDescription = document.querySelector('.jobDescription');
    
          jobDescription.insertAdjacentHTML('beforeend', posts[jobID]);
        }

        renderDetails(clickedJobID, posts);
        toggleBorder();
      }

      jobPosts.forEach(post => post.addEventListener('click', showDetails));
    };

    
    // Initialize the app
    app.init = () => {
      app.getJobData();
    }

    
    app.init();
    
    
    



