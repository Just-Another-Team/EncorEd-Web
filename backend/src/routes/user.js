const router = require('express').Router()
const {
    addUser,
    updateUser,
    deleteUser,
    viewAllUser,
    viewUser,
    userFound,
    verifyUser
} = require("../controller/user.controller")

//Add
router.post("/add", addUser);

//Update
router.put("/update/:id", updateUser)

//Delete
router.delete("/delete/:id", deleteUser)

//View
router.get("/list", viewAllUser)
router.get("/list/:id", viewUser)

//Validate
router.get("/valid", userFound)

//Verify
router.get("/verify", verifyUser)

module.exports = router