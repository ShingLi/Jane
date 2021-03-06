import Cookies from 'js-cookie'

export const setCookie = (name = 'auth', value, expires = 1) => {
    Cookies.set(name, value, { expires })
}

export const getCookie = (name = 'auth') => {
    return Cookies.get(name) || ''
}

export const removeCookie = (name = 'auth') => {
    Cookies.remove(name)
}
