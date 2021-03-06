// #!/usr/bin/env node -r esm

/* licheng 读取全局的svg文件自动引入
-------------------------- */

function importAll (r) {
    r.keys().forEach(r)
}

const requireContext = require.context('../assets/svg', true, /\.svg$/)

importAll(requireContext)