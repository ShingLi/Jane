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
        'indent': ['error', 4,
            {
                'SwitchCase': 1
            }
        ],
        'no-trailing-spaces': 'off',
        'eqeqeq': ['off'],
        'one-var': ['off'],
        'dot-notation': ['off'],
        'comma-dangle': ['error', {
            "arrays": "only-multiline",
            "objects": "only-multiline",
        }],
    }
}
