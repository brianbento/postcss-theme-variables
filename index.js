const postcss = require('postcss');

const helpers = require('./lib/helpers');

module.exports = postcss.plugin('postcss-theme-properties', themeProperties);

function themeProperties(options = {}) {
  const { themeSelector, themeSelectors } = options;
  if (!helpers.validateSelector(themeSelector)) {
    throw new Error('themeSelectors must be a non empty string');
  }
  if (!helpers.validateSelectors(themeSelectors)) {
    throw new Error('themeSelectors must be an non empty array of strings');
  }

  const themesToRemove = themeSelectors.filter(str => str !== themeSelector);

  const isRemovableTheme = new RegExp(
    `^(${escapeSelector(themesToRemove.join('|'))})`
  );

  return function(css) {
    let rootRule;
    let themeRule;
    css.walkRules(rule => {
      // The first :root rule found is expected to contain all property definitions
      if (rule.selector === ':root' && !rootRule) {
        rootRule = rule;
      } else if (rule.selector === themeSelector) {
        themeRule = rule;
        rule.walkDecls(/^--/, decl => rootRule.append(decl));
      } else if (isRemovableTheme.test(rule.selector)) {
        rule.remove();
      } else {
        rule.walkDecls(decl => {
          if (!/var\(/.test(decl.value)) {
            decl.remove();
          }
        });
        if (!rule.nodes.length) {
          rule.remove();
        }
      }
    });
    if (themeRule) {
      // @ts-ignore
      themeRule.remove();
    }
  };
}

function escapeSelector(selector) {
  return selector.replace('.', '\\.');
}
