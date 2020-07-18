import Cookies from 'js-cookie'

export const setCookie = (name = 'auth', value) => {
    Cookies.set(name, value)
}

export const getCookie = (name = 'auth') => {
    return Cookies.get(name)
}

export const removeCookie = (name = 'auth') => {
    Cookies.remove(name)
}