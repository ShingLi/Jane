module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'eqeqeq': 'off',
        'no-console': 'off',
        'comma-dangle': ['error', 'always-multiline'], // 尾逗号
        'no-trailing-spaces': 'off', // 是否允许空代码
        'vue/html-self-closing': 'off',
        'no-unused-vars': 'off',
        'arrow-parens': 'off',
        'quotes': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/require-prop-types': 'off',
        'vue/no-spaces-around-equal-signs-in-attribute': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'curly': 'off'
    }
}
