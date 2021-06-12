const f = (res, code, message, responseData = []) => {
    const Obj = {
        responseCode: code,
        responseMsg: message,
        responseData: responseData
    }
    res.json(Obj)
    return res
}

export default f