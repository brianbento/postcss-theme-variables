const postcss = require('postcss');

function themeProperties(options = {}) {
  const { themeSelector, themeSelectors } = options;
  if (!themeSelector || typeof themeSelector !== 'string') {
    throw new Error('themeSelectors must be a non empty string');
  }

  const themesToRemove = themeSelectors.filter(str => str !== themeSelector);

  const isRemovableTheme = new RegExp(
    `^(${escapeSelector(themesToRemove.join('|'))})`
  );
  const isTheme = new RegExp(
    `^(:root|${escapeSelector(themeSelectors.join('|'))})$`
  );

  return function(css) {
    let rootRule;
    let themeRule;
    css.walkRules(isTheme, rule => {
      if (rule.selector === ':root') {
        rootRule = rule;
      } else if (rule.selector === themeSelector) {
        themeRule = rule;
        rule.walkDecls(/^--/, decl => rootRule.append(decl));
      } else if (isRemovableTheme.test(rule.selector)) {
        rule.remove();
      }
    });
    themeRule.remove();
  };
}

function escapeSelector(selector) {
  return selector.replace('.', '\\.');
}

module.exports = postcss.plugin('postcss-theme-properties', themeProperties);
