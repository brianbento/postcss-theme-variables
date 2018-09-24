const helpers = require('./helpers');

const invalidThemeSelector = {
  'Undefined value': undefined,
  'Number value': 123,
  'Array value': ['.theme-blue'],
  'Object value': {},
};

Object.entries(invalidThemeSelector).forEach(([msg, selector]) =>
  test(msg, () => {
    expect(helpers.validateSelector(selector)).toBe(false);
  })
);
const invalidThemeSelectors = {
  'Empty array': [],
  'Array with non-string element': [undefined, '.theme-blue'],
  'Array with empty string': ['', '.theme-blue'],
};
Object.entries(invalidThemeSelectors).forEach(([msg, selectors]) =>
  test(msg, () => {
    expect(helpers.validateSelectors(selectors)).toBe(false);
  })
);
