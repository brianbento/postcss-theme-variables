module.exports = {
  extends: 'eslint-config-i-am-meticulous',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        trailingComma: 'es5',
      },
    ],
  },
}
