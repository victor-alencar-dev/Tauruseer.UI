export const getShortPath = (path: string) => {
  const pathArray = path.split('/');
  return pathArray.length > 3
    ? `${pathArray[0]}/${pathArray[1]}/.../${pathArray[pathArray.length - 1]}`
    : path;
};
