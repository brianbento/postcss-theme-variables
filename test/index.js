const test = require('ava');
const postcss = require('postcss');

const themeProperties = require('../');

test('Function arguments', t => {
  t.throws(themeProperties(), Error);
});
