// on page load
  // call API and populate "postings" with default results

// on click onto job posting
  // Show addition information in "description"

  // GitJobs Name Space
  const app = () => {};
  
  // Get results from github API
  app.getJobs = () => {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://jobs.github.com/positions.json/?description=python&location=new+york';
    
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
          app.displayResults(data);
        });
      }
      )
      .catch(function(err) {
        console.log('Fetch Error', err);
      });

    };

    // Display job results on the page
    app.displayResults = (jobData) => {
      const jobPostings = document.querySelector('.jobPostings');
      
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
          <div class="jobPost">
            <img src="${company_logo}"></img>
            <p>${created}</p>
            <p>${type}</p>
            <p>${title}</p>
            <p>${company}</p>
            <p>${location}</p>
          </div>
        `;

        jobPostings.insertAdjacentHTML('afterbegin', jobPost);

      });
    }

    app.handleJopPostClick = () => {
      const jobPost = document.querySelectorAll('.jobPost');
      console.log(jobPost);
      // jobPost.addEventListener('click', () => {
        
      // });

    };
    
    // Initialize the app
    app.init = () => {
      app.getJobs();
      app.handleJopPostClick();
    }

    
    app.init();
    
    
    



