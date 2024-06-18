//- Might change this to the controller side. - Gab from last month
//- Hmmm... about that one, Gab. - Gab from Sept 12, 2023
//- This IS the server side

import {adminApp, admin} from '../config'
import {
    getFirestore,
    Timestamp,
    Query,
    Filter,
    FieldPath,
} from 'firebase-admin/firestore'

const db = getFirestore(adminApp)
db.settings({ ignoreUndefinedProperties:true })

export {
    db,
    Timestamp,
    Query,
    Filter,
    FieldPath
}