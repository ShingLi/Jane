import f from './f'
import consola from 'consola'


const parseQuery = (req) => {
    return new Promise((resolve, reject) => {
        try {
            const requestType = req.method
            let data = {}
            if (requestType === 'post') {
                data = req.body
            } else {
                data = req.query
            }
            if (!Object.keys(data).length) {
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

const fn = {
    f,
    consola,
    parseQuery
}

const utils = {
    fn
}

export {
    fn
}

export  default utils