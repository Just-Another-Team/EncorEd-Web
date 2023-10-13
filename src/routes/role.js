const router = require('express').Router()
const {
    addClientRole,
    editClientRole,
    deleteClientRole,
    viewClientRoles,
    viewClientRole,
    addAdminRole,
    editAdminRole,
    deleteAdminRole,
    viewAdminRole,
    viewAdminRoles,
} = require("../controller/role.controller")
const {
    assignRole,
    removeRole, 
    viewAssignedRoles
} = require('../controller/userRole.controller')

/* CRUD Role */
router.post("/add", addClientRole)
router.post("/admin/add", addAdminRole)

/* Assigning Roles */
router.post("/assign", assignRole)
router.get("/assign/:id", viewAssignedRoles)

module.exports = router