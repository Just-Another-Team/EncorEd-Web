import axios from "axios"

export default axios.create({
    baseURL: "https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api", //https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api
    headers: {
        "Content-Type": "application/json"
    }
})