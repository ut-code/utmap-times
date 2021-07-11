// eslint-disable-next-line import/prefer-default-export
export function isExternalUrl(url: string): boolean {
  return /^(https?:)?\/\//.test(url);
}
