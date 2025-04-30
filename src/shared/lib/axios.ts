import axios from 'axios'

export const api  = axios.create({
    baseURL : 'https://dummyjson.com',
    timeout:10000,
    headers :{
        'Content-Type' :'application/json'
    }
})

api.interceptors.response.use(
    response=>response,
    error=>{
        console.error('API Error',error)
        return Promise.reject(error)
    }
)