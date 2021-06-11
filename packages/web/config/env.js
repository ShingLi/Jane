const getBaseURL = () => {
    let BASEURL, NODE_ENV = process.env.NODE_ENV

    console.log('env.js--NODE_ENV===', NODE_ENV)
    switch (NODE_ENV) {
        case 'development':
            BASEURL = 'http://localhost:7000'
            break
        case 'sit':
            BASEURL  = 'http://localhost:4000/web'
        default:
            break
    }
    return BASEURL
}

export default getBaseURL()