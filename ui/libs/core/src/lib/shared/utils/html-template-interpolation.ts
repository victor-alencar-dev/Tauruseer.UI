//base on stackoverflow response https://stackoverflow.com/a/47358102
const regex = /\${([^{]+[^}])}/g;
export function interpolate(template: string, variables: any, fallback: string | undefined) {
  return template.replace(regex, (match) => {
    const path = match.slice(2, -1).trim();
    return getObjPath(path, variables, fallback);
  });
}

//get the specified property or nested property of an object
export function getObjPath(path: string, obj: any, fallback = '') {
  return path.split('.').reduce((res, key) => res[key] || fallback, obj);
}
