module.exports = [
    {
        charset: 'utf-8'
    },
    {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
    },
    {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'shingli的web页面'
    }
]
