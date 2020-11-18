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
        });
      }
      )
      .catch(function(err) {
        console.log('Fetch Error', err);
      });
    };
    
    // Initialize the app
    app.init = () => {
      app.getJobs();
    }
    
    app.init();
    
    
    



