const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
    try {
      const repoName = core.getInput('repo-name');
      console.log(`Repository to check: ${repoName}!`);

      const token = core.getInput('github-token');
  
      if (!repoName) {
        throw new Error('The repo-name input is required!');
      }
  
      // Splitting here for future validation
      const [owner, repo] = repoName.split('/');
  
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      core.setOutput('metadata', JSON.stringify(response.data));
  
    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run();
