function flatRecepies(arr, currentId, collection) {
  return arr.reduce((all, next) => (
    collection[next].childrens?.length
      ? all.concat(flatRecepies(collection[next]?.childrens, collection[next].id))
      : all.concat(next)), [currentId]);
}

function sortBy(key, arr, collection) {
  if (arr.length < 2) return arr;
  return arr.sort((a, b) => {
    const nameA = collection[a][key].toUpperCase();
    const nameB = collection[b][key].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

export { flatRecepies, sortBy };
