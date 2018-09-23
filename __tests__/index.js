// const postcss = require('postcss');
const themeProperties = require('../');

const invalidThemeSelector = ['', undefined, 123, ['.theme-blue'], {}];
const invalidThemeSelectors = {
  'Empty array': [],
  'Array with non-string element': [undefined, '.theme-blue'],
  'Array with empty string': ['', '.theme-blue'],
};
const validthemeSelectors = ['.theme-blue', '.theme-green'];

test('Throws without arguments', () => {
  expect(() => themeProperties()).toThrow();
});
test('Throws with invalid themeSelector', () => {
  invalidThemeSelector.forEach(themeSelector =>
    expect(() =>
      themeProperties({
        themeSelector,
        themeSelectors: validthemeSelectors,
      })
    ).toThrow()
  );
});
test('Throws with invalid themeSelectors', () => {
  invalidThemeSelectors.forEach(themeSelectors =>
    expect(() =>
      themeProperties({
        themeSelector: '.theme-blue',
        themeSelectors,
      })
    ).toThrow()
  );
});
