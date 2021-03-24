module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'func-names': 0,
    'arrow-parens': 0,
    'linebreak-style': 'off',
    'generator-star-spacing': 0,
    'no-param-reassign': 0,
    'max-len': 'off',
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-useless-return': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'import/no-cycle': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'space-before-function-paren': ['error', { anonymous: 'ignore', named: 'ignore', asyncArrow: 'ignore' }],
    camelcase: 0,
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'class-methods-use-this': 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0
  },
};
