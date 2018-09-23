module.exports = {
  validateSelector,
  validateSelectors,
};
function validateSelector(str) {
  return typeof str === 'string' && !!str.length;
}
function validateSelectors(arr) {
  return !!(Array.isArray(arr) && arr.length && arr.every(validateSelector));
}
