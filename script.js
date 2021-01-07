// on page load
  // call API and populate "postings" with default results

// on click onto job posting
  // Show addition information in "description"

  // GitJobs Name Space
  const app = () => {};
  
  // Get results from github API
  app.getJobData = () => {
    const proxyurl = 'https://ancient-oasis-20473.herokuapp.com/';
    const url = 'https://jobs.github.com/positions.json/';
    
    fetch(proxyurl + url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + 
          response.status);
          return;
        }
        response.json().then(function(data) {
          console.log(data);
          app.removePlaceholders();
          app.displayJobs(data);
        });
      }
      )
      .catch(function(err) {
        console.log('Fetch Error', err);
      });

    };
  

    // Clear placeholders
    app.removePlaceholders = () => {
      const jobPostings = document.querySelector('.jobPostings');
      jobPostings.innerHTML = '';

      // const jobDescription = document.querySelector('.jobDescription');
      // jobDescription.innerHTML = '';
    }

    // Display job results on the page
    app.displayJobs = (jobData) => {
      const jobPostings = document.querySelector('.jobPostings');
      // const jobDescription = document.querySelector('.jobDescription');
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

        // Trim down the created_at string
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
        `

        const posting = {
          jobPost: jobPost,
          jobDetails: jobDetails
        };

        posts.push(posting);
        postID++;

        // insert rendered postings into jobPostings
        jobPostings.insertAdjacentHTML('beforeend', jobPost);
        // jobDescription.insertAdjacentHTML('afterbegin', jobDetails);

      });

      console.log(posts);

      app.handleJopPostClick(posts);
    }

    app.removeDetails = () => {
      const jobDescription = document.querySelector('.jobDescription');
      jobDescription.innerHTML = '';
    }

    // On jobPost-click render information in details container
    app.handleJopPostClick = (posts) => {


      const jobPosts = document.querySelectorAll('.jobPost');

      function showDetails(event) {      
        app.removeDetails();

        const clickedJobPost = event.currentTarget;
        // clickedJobPost.closest('.jobPost')
        console.log(clickedJobPost);
        const clickedJobID = clickedJobPost.attributes[1].value;

        app.renderDetails(clickedJobID, posts);
      }

      jobPosts.forEach(post => post.addEventListener('click', showDetails));
    };

    // Print details onto page using ID reference for index selection
    app.renderDetails = (jobID, posts) => {
      const jobDescription = document.querySelector('.jobDescription');

      jobDescription.insertAdjacentHTML('beforeend', posts[jobID].jobDetails);
    }
    
    // Initialize the app
    app.init = () => {
      app.getJobData();
    }

    
    app.init();
    
    
    



