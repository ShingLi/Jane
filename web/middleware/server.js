/* licheng 服务端中间件
-------------------------- */
export default function (req, res, next) {
    console.log(req.url)
    next()
}