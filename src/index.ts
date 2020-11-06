import * as core from '@actions/core';
import * as github from '@actions/github';
import {closeAndCommentPR} from './close-and-comment';
import {processDiffUrl} from './process-diff';

async function run(): Promise<void> {
  try {
    const exemptRegex = new RegExp(
      core.getInput('exempt-regex', {required: true})
    );
    const token = core.getInput('repo-token');
    const message = core.getInput('message', {required: true});

    if (github.context.payload.pull_request === undefined) {
      core.setFailed('Trigger not a pull request');
      return;
    }

    const url =
      'https://api.github.com/repos/' +
      `${github.context.repo.owner}/${github.context.repo.repo}/pulls/` +
      `${github.context.payload.pull_request.number}`;

    core.debug(`processing diff from ${url}`);
    const fileList = await processDiffUrl(`${url}`, token);
    for (const file of fileList) {
      if (file.match(exemptRegex)) {
        core.debug(`${file} matched ${exemptRegex}`);
        await closeAndCommentPR(
          github.context.payload.pull_request.number,
          github.context.repo.owner,
          github.context.repo.repo,
          message,
          github.getOctokit(token)
        );
        break;
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
