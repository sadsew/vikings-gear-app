export function saveStateToLS(storageName, object) {
  const savedObject = JSON.stringify(object)
  localStorage.setItem(storageName, savedObject);
}

export function loadStateFromLS(storageName) {
  const savedObject = JSON.parse(localStorage.getItem(storageName));
  return savedObject;
}
