import * as github from '@actions/github';

export async function closeAndCommentPR(
  PRnum: number,
  owner: string,
  repo: string,
  message: string,
  octo: ReturnType<typeof github.getOctokit>
): Promise<void> {
  const commentResponse = await octo.rest.issues.createComment({
    owner: owner,
    repo: repo,
    issue_number: PRnum,
    body: message,
  });
  if (commentResponse.status !== 201) {
    throw new Error(`Could not create PR comment: ${commentResponse.status}`);
  }
  const closureResponse = await octo.rest.pulls.update({
    owner: owner,
    repo: repo,
    pull_number: PRnum,
    state: 'closed',
  });
  if (
    (closureResponse.status as number) !== 202 &&
    (closureResponse.status as number) !== 200
  ) {
    throw new Error(`Could not close PR: ${closureResponse.status}`);
  }
}
