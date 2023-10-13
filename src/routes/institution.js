const router = require('express').Router()
const {
    addInstitution,
    updateInstitution,
    deleteInstitution,
    viewAllInstitutions,
    viewInstitution
} = require("../controller/institution.controller")

router.post("/add", addInstitution);

router.put("/update/:id", updateInstitution)

router.delete("/delete/:id", deleteInstitution)

router.get("/list/all", viewAllInstitutions);

router.get("/list/:id", viewInstitution)

module.exports = router