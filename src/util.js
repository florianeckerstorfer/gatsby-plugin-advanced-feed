export function addLeadingSlash(path) {
  return `${path.charAt(0) !== `/` ? '/' : ''}${path}`;
}
