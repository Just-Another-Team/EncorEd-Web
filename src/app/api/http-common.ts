import axios from "axios"

export default axios.create({
    baseURL: "https://us-central1-encored-bd6f8.cloudfunctions.net/encored_api",
    //baseURL: `http://localhost:4000`,
    //baseURL: `http://127.0.0.1:5001/encored-bd6f8/us-central1/encored_api`,
    headers: {
        "Content-Type": "application/json"
    }
})