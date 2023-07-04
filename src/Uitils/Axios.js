import axios from "axios"

export const url = 'http://localhost:4000'


export default axios.create({
    baseURL:url+"/api"
})