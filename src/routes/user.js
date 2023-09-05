const router = require('express').Router()
const {
    addUser,
    updateUser,
    deleteUser,
    viewAllUser,
    viewUser
} = require("../controller/user.controller")

//Add
router.post("/add", addUser);

//Update
router.put("/update/:id", updateUser)

//Delete
router.delete("/delete/:id", deleteUser)

//View
router.get("/", viewAllUser)
router.get("/:id", viewUser)

module.exports = router