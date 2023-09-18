const router = require('express').Router()
const {
    addUser,
    updateUser,
    deleteUser,
    viewAllUser,
    viewUser,
    userFound,
    verifyUser,
    loginUser
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
router.put("/verify", verifyUser)

router.post("/login", loginUser)

module.exports = router