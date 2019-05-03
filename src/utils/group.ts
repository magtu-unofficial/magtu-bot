export default (group: string): string | undefined => {
  if (group.search(/[А-Яа-я]{1,6}-\d{2}-\d/) === 0) {
    return group.toLowerCase();
  }
};
