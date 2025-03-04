import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_API
})

api.interceptors.request.use( config => {
    const authJWT = localStorage.getItem('AUTH_JWT')
    if (authJWT) {
        config.headers.Authorization = `Bearer ${authJWT}`
    }
    return config
})

export default api