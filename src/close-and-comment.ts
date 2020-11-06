import {GitHub} from '@actions/github/lib/utils';

export async function closeAndCommentPR(
  PRnum: number,
  owner: string,
  repo: string,
  message: string,
  octo: InstanceType<typeof GitHub>
): Promise<void> {
  const commentResponse = await octo.issues.createComment({
    owner: owner,
    repo: repo,
    issue_number: PRnum,
    body: message,
  });
  if (commentResponse.status !== 201) {
    throw new Error(`Could not create PR comment: ${commentResponse.status}`);
  }
  const closureResponse = await octo.pulls.update({
    owner: owner,
    repo: repo,
    pull_number: PRnum,
    state: 'closed',
  });
  if (closureResponse.status !== 202) {
    throw new Error(`Could not close PR: ${closureResponse.status}`);
  }
}
