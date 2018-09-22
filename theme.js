const fs = require('fs').promises;

const postcss = require('postcss');
const postcssCustomProperties = require('postcss-custom-properties');

const themeProperties = require('./');

process();

async function process() {
  const css = await fs.readFile('./test/fixtures/themes.css', 'utf8');
  const result = await postcss([
    themeProperties({
      themeSelector: '.theme-green',
      themeSelectors: ['.theme-blue', '.theme-green'],
    }),
    postcssCustomProperties({
      preserve: false,
    }),
  ]).process(css, { from: undefined });
  console.log(result.css);
}
