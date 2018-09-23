// const postcss = require('postcss');
const themeProperties = require('./index');

const invalidThemeSelector = {
  'Throws with empty string': '',
  'Throws with undefined': undefined,
  'Throws with number': 123,
  'Throws with array': ['.theme-blue'],
  'Throws with object': {},
};

const invalidThemeSelectors = {
  'Empty array': [],
  'Array with non-string element': [undefined, '.theme-blue'],
  'Array with empty string': ['', '.theme-blue'],
};
const validthemeSelectors = ['.theme-blue', '.theme-green'];

test('Throws without arguments', () => {
  expect(() => themeProperties()).toThrow();
});

Object.entries(invalidThemeSelector).forEach(([msg, themeSelector]) =>
  test(msg, () => {
    expect(() =>
      themeProperties({
        themeSelector,
        themeSelectors: validthemeSelectors,
      })
    ).toThrow();
  })
);

Object.entries(invalidThemeSelectors).forEach(([msg, themeSelectors]) =>
  test(msg, () => {
    expect(() =>
      themeProperties({
        themeSelector: '.theme-blue',
        themeSelectors,
      })
    ).toThrow();
  })
);
