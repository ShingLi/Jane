/* licheng 加载js文件
-------------------------- */

export default function loader (src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = src
        script.onload = () => {
            resolve ()
        }
        script.onerror = () => {
            reject()
        }
        document.body.appendChild(script)
    })
}