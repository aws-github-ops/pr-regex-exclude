import * as nock from 'nock';
import * as path from 'path';
import {processDiffUrl} from '../src/process-diff';

it('should fetch and process a diff', async () => {
  nock.load(path.join(__dirname, 'process-diff.http.json'));
  const files = await processDiffUrl(
    'https://patch-diff.githubusercontent.com/raw/octocat/Hello-World/pull/602.diff',
    ''
  );
  expect(files).toEqual(['README']);
  nock.restore();
});

it('should throw an error for bad URLs', async () => {
  nock.load(path.join(__dirname, 'process-diff-err.http.json'));
  await expect(
    processDiffUrl(
      'https://patch-diff.githubusercontent.com/raw/octocat/Hello-World/pull/LOL404.diff',
      ''
    )
  ).rejects.toThrow();
  nock.restore();
});
