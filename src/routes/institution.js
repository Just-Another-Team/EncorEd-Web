const router = require('express').Router()
const {
    addInstitution,
    updateInstitution,
    deleteInstitution,
    viewAllInstitutions
} = require("../controller/institution.controller")

router.post("/add", addInstitution);

router.put("/update/:id", updateInstitution)

router.delete("/delete/:id", deleteInstitution)

router.get("/list/all", viewAllInstitutions);

module.exports = router