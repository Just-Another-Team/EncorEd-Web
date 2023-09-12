const router = require('express').Router()
const {
    addSubject,
    deleteSubject,
    updateSubject,
    viewAllSubject,
    viewSubject
} = require("../controller/subject.controller")

router.post("/add", addSubject)

router.put("/update/:id", updateSubject)

router.delete("/delete/:id", deleteSubject)

router.get("/list", viewAllSubject)
router.get("/list/:id", viewSubject)

module.exports = router