const fs = require('fs').promises;

const postcss = require('postcss');
const postcssCustomProperties = require('postcss-custom-properties');

const themeProperties = require('../index');

module.exports = testFixture;
async function testFixture(cssPath, expectedCssPath, pluginOptions) {
  const expectedCss = await fs.readFile(expectedCssPath, 'utf8');
  const css = await fs.readFile(cssPath, 'utf8');
  const result = await postcss([
    themeProperties(pluginOptions),
    postcssCustomProperties({
      preserve: false,
    }),
  ]).process(css, { from: undefined });
  if (result.css === expectedCss) {
    return true;
  }
  return result.css;
}
