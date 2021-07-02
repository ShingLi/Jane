const utils = {
    bindEvent (event, f) {
        window.addEventListener(event, f, {
            passive: true
        })
    },
    unbindEvent (event, f) {
        window.removeEventListener(event, f)
    },
}

export default utils
