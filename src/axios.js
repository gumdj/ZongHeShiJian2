import axios from 'axios'
import { Message } from 'element-ui'
import router from "./router";

axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config
})

axios.interceptors.response.use(response => {
    if (response.status && response.status === 200) {
        if (response.data.code === 500) {
            Message.error({message: response.data.msg});
            return;
        }
    }
    return response.data;
}, error => {
    Message.error({ message: '寄！' })
})

export const postRequest = (url, params) => {
    return axios( {
        method: 'post',
        url: `${url}`,
        data: params,
    } )
}

export const getRequest = (url, params) => {
    return axios( {
        method: 'get',
        url: `${url}`,
        data: params,
    } )
}

export const putRequest = (url, params) => {
    return axios( {
        method: 'put',
        url: `${url}`,
        data: params,
    } )
}

export const deleteRequest = (url, params) => {
    return axios( {
        method: 'delete',
        url: `${url}`,
        data: params,
    } )
}