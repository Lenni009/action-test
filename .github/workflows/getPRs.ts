import core from 'npm:@actions/core';
import github from 'npm:@actions/github';

async function listPullRequests(token: string, repoOwner: string, repo: string, state: string) {
    const octokit = github.getOctokit(token);
    const pullRequests = octokit.rest.pulls.list({
      owner: repoOwner,
      repo: repo,
      state: state,
      sort: 'created',
      direction: 'desc',
      per_page: 100,
    });
    return pullRequests;
  }

  function outputNumbers(list) {
    let numberList = list.map(p => p.number);
    core.setOutput('pullRequestNumbers', numberList);
  }

  try {
    const token = core.getInput('token');
    const repoOwner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const state = core.getInput('state');
    
    const list = await listPullRequests(token, repoOwner, repo, state);
    outputNumbers(list);
  } catch (error: Error) {
    core.setFailed(error.message);
  }