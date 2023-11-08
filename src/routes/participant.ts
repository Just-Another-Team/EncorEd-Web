import { Router } from "express";
const {
    addParticipant,
    updateParticipant,
    deleteParticipant,
    viewAllParticipants,
    viewParticipantsBySubject,
    viewParticipantsByUser
} = require("../controller/participants.controller")

const participantRouter = Router();

participantRouter.post("/add", addParticipant);

participantRouter.put("/update/:id", updateParticipant)

participantRouter.delete("/delete/:id", deleteParticipant)

participantRouter.get("/list/all", viewAllParticipants);
participantRouter.get("/list/subject/:id", viewParticipantsBySubject);
participantRouter.get("/list/user/:id", viewParticipantsByUser)

export default participantRouter