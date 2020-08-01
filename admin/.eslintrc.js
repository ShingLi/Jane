module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'indent': ['error', 4],
        'no-trailing-spaces': 'off',
        'eqeqeq': ['off'],
        'one-var': ['off'],
        'dot-notation': ['off'],
        'comma-dangle': ['error', {
            "arrays": "always-multiline",
            "objects": "always-multiline",
        }]
    }
}
