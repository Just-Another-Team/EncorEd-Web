import {
    db,
    Timestamp,
} from '../database'
import { converter } from '../models/converter';
import IEventAttendance from '../models/eventAttendance.model';

const eventAttendanceCollection = db.collection(`/eventAttendance/`).withConverter(converter<IEventAttendance>())

// const addEventAttendance = async (req, res) => {
//     try {
//         const { eventSchedId, attendeeId, status, submittedDate, remarks } = req.body;

//         let eventAttendance = new EventAttendance(
//             eventSchedId,
//             attendeeId, 
//             status,
//             new Date(submittedDate),
//             remarks
//         )

//         await eventAttendanceCollection.doc().create(eventAttendance)
//             .then((result) => {
//                 res.status(200).json({message: "Event Attendance added successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })

//         //const eventAttendanceDoc = await db.doc(`eventAttendance`).create(eventAttendance)

        
//     } catch (e) {
//         res.status(400).json({name: "Event Attendance", type: "Add", error: e.message})
//         console.log(e)
//     }
// }

// const updateEventAttendace = async (req, res) => {
//     const id = req.params.id;

//     try{
//         const { 
//             eventSchedId,
//             attendeeId,
//             status,
//             submittedDate, 
//             remarks
//         } = req.body;

//         const eventAttendanceDocRef = db.doc(`/eventAttendance/${id}`).withConverter(eventAttendanceCollection);

//         console.log(req.body)

//         let eventAttendance = new EventAttendance(
//             eventSchedId,
//             attendeeId,
//             status,
//             new Date(submittedDate),
//             remarks,
//         )

//         await eventAttendanceDocRef.update(Object.assign({}, eventAttendance))
//             .then((result) => {
//                 res.status(200).json({message: "Event Attendance updated successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     }
//     catch(e) {
//         res.status(400).json({name: "Event Attendance", type: "Update", error: e.message})
//     }
// }

// const deleteEventAttendance = async (req, res) => {
//     const id = req.params.id;

//     try{
//         const eventAttendanceDocRef = db.doc(`/eventAttendance/${id}`).withConverter(eventAttendanceConverter); //Can be three parameters. See docs
//         await eventAttendanceDocRef.delete()
//             .then((result) => {
//                 res.status(200).json({message: "Event attendance delete successfully"})
//             })
//             .catch((err) => {
//                 throw {message: err.message}
//             })
//     }
//     catch(e) {
//         res.status(400).json({name: "Event Attendance", type: "Delete", error: e.message})
//     }
// }

// const viewAllEventAttendances = async (req, res) => {
//     const eventAttendances = []

//     try {
//         const getEventAttendanceDocs = await eventAttendanceCollection.get();

//         if (getEventAttendanceDocs.empty)
//             throw {message: "Event Attendance collections is empty"};

//         getEventAttendanceDocs.forEach((eventAttendance) => {
//             const {
//                 eventSchedId,
//                 attendeeId,
//                 status,
//                 submittedDate,
//                 remarks
//             } = eventAttendance.data();

//             eventAttendances.push({
//                 id: eventAttendance.id,
//                 eventSchedId: eventSchedId,
//                 attendeeId: attendeeId,
//                 status: status,
//                 submittedDate: new Timestamp(submittedDate._seconds, submittedDate._nanoseconds).toDate(),
//                 remarks: remarks
//             })
//         })

//         res.status(200).json(eventAttendances)
//     }
//     catch(e) {
//         res.status(400).json({name: "Event Attendance", type: "Retrieval All", error: e.message})
//         console.log(e)
//     }
// }

// module.exports = {
//     addEventAttendance,
//     updateEventAttendace,
//     deleteEventAttendance,
//     viewAllEventAttendances
// }