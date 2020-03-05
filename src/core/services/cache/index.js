import Cookies from 'js-cookie'
import { TOKEN_KEY, LANGUAGE_KEY } from '@/constants/settings'

export const getToken = () => Cookies.get(TOKEN_KEY)
export const setToken = (token) => Cookies.set(TOKEN_KEY, token)
export const removeToken = () => Cookies.remove(TOKEN_KEY)

export const getLanguage = () => Cookies.get(LANGUAGE_KEY)
export const setLanguage = language => Cookies.set(LANGUAGE_KEY, language)

export const saveToLocalStorage = (name, content) => window.localStorage.setItem(name, JSON.stringify(content))
export const readFromLocalStorage = name => JSON.parse(window.localStorage.getItem(name))
export const cleanLocalStorage = name => window.localStorage.removeItem(name)
