const {
    db,
    Timestamp,
    Filter,
    FieldPath
} = require('../database');
const {
    userRoleConverter,
    UserRole
} = require("../models/userRole.model");
const { roleCollection } = require('./role.controller');

const userRoleCollection = db.collection(`/userRole/`).withConverter(userRoleConverter)

const assignRole = async (req, res) => {
    try {
        let userRole = new UserRole(
            req.body.userId,
            req.body.roleId
        )

        await userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).create(userRole)

        //viewAssignedRoles()

        //const assignedRoleRef = await userRoleCollection.where('userId', '==', userRole.userId).get()
        
        //Get the View Assigned Roles Method
        // const assignedRoles = assignedRoleRef.docs.map(role => role.data())
        // console.log("Assigned Roles", assignedRoles)

        res.status(200).json({message: "User Role assigned successfully"}) //Returns all assigned roles
    } catch (e) {
        res.status(400).json({name: "User Role", type: "Assign", error: e.message})
    }
}

const assignAdminRole = async (req, res) => {
    
}

const removeRole = async (req, res) => {

}

const viewAssignedRoles = async (req, res) => {
    const userId = req.params.id

    try {
        const userRoleRef = await userRoleCollection.where('userId', '==', userId).get();

        if (userRoleRef.empty)
            throw {message: "User Id not found"}

        const userRoleIds = userRoleRef.docs.map(data => data.data()._roleId)

        const roleRef = await roleCollection.where(FieldPath.documentId(), 'in', userRoleIds).get()

        if (roleRef.empty)
            throw {message: "User does not contain any roles"}

        const roles = roleRef.docs.map(role => role.data())

        console.log("Assigned Roles", roles)

        res.status(200).json(roles)
    } catch(e) {
        res.status(400).json({name: "User Role", type: "View", error: e.message})
    }
}

module.exports = {assignRole, removeRole, viewAssignedRoles, userRoleCollection}