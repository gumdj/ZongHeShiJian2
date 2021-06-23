import axios from 'axios'
import router from "./router"
import Element from "element-ui"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})