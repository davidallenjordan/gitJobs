// GitJobs Name Space
  const app = () => {};
  
  // Get data from GitHub Jobs API
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
          app.removePostingsPlaceholder();
          app.displayJobs(data);
        });
      }
      )
      .catch(function(err) {
        console.log('Fetch Error', err);
      });
    };
  
    // Clear .jobPostings placeholder
    app.removePostingsPlaceholder = () => {
      const jobPostings = document.querySelector('.jobPostings');
      jobPostings.innerHTML = '';
    }

    // Decontruct API data into variables with HTML literals
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

    // Clears .jobDetails to prepare for new details
    app.removeDetails = () => {
      const jobDescription = document.querySelector('.jobDescription');
      jobDescription.innerHTML = '';
    }

    // Listens for .jobPost click and passes on clicked ID 
    app.handleJopPostClick = (posts) => {
      const jobPosts = document.querySelectorAll('.jobPost');

      function showDetails(event) {      
        app.removeDetails();

        const clickedJobPost = event.currentTarget;
        const clickedJobID = clickedJobPost.attributes[1].value;

        app.renderDetails(clickedJobID, posts);
      }

      jobPosts.forEach(post => post.addEventListener('click', showDetails));
    };

    // Uses clicked ID to render appropriate details in .jobDetails
    app.renderDetails = (jobID, posts) => {
      const jobDescription = document.querySelector('.jobDescription');

      jobDescription.insertAdjacentHTML('beforeend', posts[jobID]);
    }
    
    // Initialize the app
    app.init = () => {
      app.getJobData();
    }

    
    app.init();
    
    
    



