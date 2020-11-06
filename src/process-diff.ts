import * as parse from 'parse-diff';
import fetch, {Headers} from 'node-fetch';

export async function processDiffUrl(
  htmlUrl: string,
  token: string
): Promise<string[]> {
  const headers = new Headers([
    ['Accept', 'application/vnd.github.v3.diff'],
    ['Authorization', `token ${token}`],
  ]);
  const response = await fetch(htmlUrl, {headers: headers});
  if (response.status !== 200) {
    throw new Error(`Could not fetch diff file for PR: ${response.status}`);
  }
  const diff = await response.text();
  const files = parse(diff);
  return files
    .map(file => file.to)
    .filter((file): file is string => file !== undefined);
}
