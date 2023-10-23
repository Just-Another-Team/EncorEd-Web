const router = require('express').Router()
const isAuthentication = require('../auth/authenticated');
const isAuthorized = require('../auth/authorized');
const {
    addUser,
    updateUser,
    deleteUser,
    viewAllUser,
    viewAllUsersByInstitution,
    viewUser,
    signIn,
    signUp,
    addAppAdmin,
    assignInstitution
} = require("../controller/user.controller")

//If user exists

//Add
//router.post("/add", isAuthentication, isAuthorized(['superadmin', 'admin']), addUser);
router.post("/add", addUser);
router.post("/signUp", signUp);
router.post("/admin/add", addAppAdmin)

//Update
router.put("/update/:id", updateUser)
router.patch("/institution/assign", assignInstitution)

//Delete
router.delete("/delete/:id", deleteUser)

//View
router.get("/list", viewAllUser)
router.get("/list/u/:institution", viewAllUsersByInstitution)
router.get("/list/:id", viewUser)
//router.get("/list/:institution", <method for users based on institution>)

module.exports = router