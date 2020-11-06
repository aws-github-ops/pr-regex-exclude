import * as parse from 'parse-diff';
import fetch, {Headers} from 'node-fetch';

export async function processDiffUrl(
  htmlUrl: string,
  token?: string
): Promise<string[]> {
  const response =
    token === undefined
      ? await fetch(htmlUrl)
      : await fetch(htmlUrl, {
          headers: new Headers([['Authorization', `token ${token}`]]),
        });
  if (response.status !== 200) {
    console.log(response.status);
    console.log(response.statusText);
    console.log(`364866${token}468124`);
    throw new Error('Could not fetch diff file for PR');
  }
  const diff = await response.text();
  const files = parse(diff);
  return files
    .map(file => file.to)
    .filter((file): file is string => file !== undefined);
}
