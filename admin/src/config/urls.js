const prefix = '/admin/api'

const urls = {
    login: 'login'
}
for (let key in urls) {
    urls[key] = `${prefix}/${urls[key]}`
}

export default urls
