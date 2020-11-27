export function notParsePath(moduleName: string, path: string) {
  return `${moduleName}: failed to parse the path=${path} to a navigation state`;
}
