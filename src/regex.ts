function isJsonArray(token: string): boolean {
  try {
    if (Array.isArray(JSON.parse(token))) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export function parseRegex(token: string): RegExp {
  if (isJsonArray(token)) {
    return new RegExp(`(${JSON.parse(token).join(')|(')})`);
  } else {
    return new RegExp(token);
  }
}
