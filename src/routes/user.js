const router = require('express').Router()
const {
    addUser,
    updateUser,
    deleteUser,
    viewAllUser,
    viewUser,
    userFound,
    verifyUser,
    signIn
} = require("../controller/user.controller")

//Add
router.post("/add", addUser);
// (req, res) => {
//     try {
//         const {firstName, lastName, email, userName, password } = req.body;

//         const userInput = {
//             firstName,
//             lastName,
//             userName,
//             addedBy: null,
//             isAdmin: true,
//             isAlumni: false,
//             status: "Open"
//         }

        
//     } catch (e) {
//         res.status(400).json({error: "Router error", message: e.message})
//     }

//Update
router.put("/update/:id", updateUser)

//Delete
router.delete("/delete/:id", deleteUser)

//View
router.get("/list", viewAllUser)
router.get("/list/:id", viewUser)

router.post("/signIn", signIn)

//Actually, this is not needed. Thank you Firebase Authentication!
// //Validate
// router.get("/valid", userFound)

// //Verify
// router.get("/verify", verifyUser)

module.exports = router