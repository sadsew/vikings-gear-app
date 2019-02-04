export function itemsCounter(object) {
  const array = [];
  for (let key in object) {
    array.push(key);
  }
  return array.length;
}
