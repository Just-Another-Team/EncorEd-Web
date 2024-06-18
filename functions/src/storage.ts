import {
    getStorage,
    getDownloadURL
} from 'firebase-admin/storage'
import { adminApp } from '../config'

const storage = getStorage(adminApp)
const bucket = storage.bucket('gs://encored-bd6f8.appspot.com')

export {
    storage,
    bucket,
    getDownloadURL
}
