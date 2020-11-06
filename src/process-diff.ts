import * as parse from 'parse-diff';
import fetch from 'node-fetch';

export async function processDiffUrl(htmlUrl: string): Promise<string[]> {
  const response = await fetch(htmlUrl);
  if (response.status !== 200) {
    throw new Error(`Could not fetch diff file for PR: ${response.status}`);
  }
  const diff = await response.text();
  const files = parse(diff);
  return files
    .map(file => file.to)
    .filter((file): file is string => file !== undefined);
}
