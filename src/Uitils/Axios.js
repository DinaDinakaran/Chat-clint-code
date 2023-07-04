import axios from "axios"

export const url = 'https://chat-server-0ifv.onrender.com'


export default axios.create({
    baseURL:url+"/api"
})