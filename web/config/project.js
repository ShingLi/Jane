module.exports = {
    title: '夕阳下的那个女孩',
    console: true, // 是否开启调试工具
    customRoutes: [
        {
            path: '/',
            redirect: {
                path: '/index.html'
            }
        },
        {
            path: '/about*', // https://github.com/pillarjs/path-to-regexp/tree/v1.7.0 正则匹配
            redirect: {
                path: '/about.html'
            }
        },
    ],
}