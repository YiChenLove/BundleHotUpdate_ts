module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        parser: require.resolve('babel-eslint'),
        sourceType: 'module'
    },
    plugins: [],
    ignorePatterns: ['.prettierrc.js', '.stylelintrc.js'],
    rules: {}
};
