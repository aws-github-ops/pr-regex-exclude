import * as core from '@actions/core';
import * as github from '@actions/github';
import {closeAndCommentPR} from './close-and-comment';
import {processDiffUrl} from './process-diff';

async function run(): Promise<void> {
  try {
    const exemptRegex = new RegExp(core.getInput('exempt-regex'));
    const token = core.getInput('repo-token');
    const message = core.getInput('message');

    if (github.context.payload.pull_request === undefined) {
      core.setFailed('Trigger not a pull request');
      return;
    }

    const url = github.context.payload.pull_request.html_url;
    if (url === undefined) {
      core.setFailed('No html_url for pull_request');
      return;
    }

    core.debug(
      `processing diff from ${github.context.payload.pull_request.html_url}.diff`
    );
    const fileList = await processDiffUrl(`${url}.diff&token=${token}`);
    for (const file in fileList) {
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
