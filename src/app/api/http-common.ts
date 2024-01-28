import axios from "axios"

export default axios.create({
    baseURL: 'https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api',//"http://localhost:4000",/* "https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api" */ //"http://localhost:4000" ,
    headers: {
        "Content-Type": "application/json"
    }
})