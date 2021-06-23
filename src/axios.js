import axios from 'axios'
import router from "./router"
import Element from "element-ui"

// axios.defaults.baseURL = 'http://localhost:8081'

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})