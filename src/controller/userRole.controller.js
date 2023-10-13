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
const userRoleCollectionGroup = db.collectionGroup(`userRole`).withConverter(userRoleConverter)

const assignRole = async (req, res) => {
    try {
        let userRole = new UserRole(
            req.body.userId,
            req.body.roleId
        )

        await userRoleCollection.doc(`${userRole.userId}-${userRole.roleId}`).create(userRole)
            .then((result) => {
                res.status(200).json({message: "User Role assigned successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })
    } catch (e) {
        res.status(400).json({name: "User Role", type: "Assign", error: e.message})
    }
}

const removeRole = async (req, res) => {

}

const viewAssignedRoles = async (req, res) => {
    const userId = req.params.id

    try {
        const userRoleRef = await userRoleCollection.where('userId', '==', userId).get();

        if (userRoleRef.empty)
            throw {message: "User role not found"}

        let userRole = []

        userRoleRef.forEach(_userRole => {
            userRole.push(_userRole.data().roleId)
        })

        let roles = []

        const roleRef = await roleCollection.where(FieldPath.documentId(), 'in', userRole).get()

        roleRef.forEach(_role => {
            roles.push(_role.data())
        })

        res.status(200).json(roles)
    } catch(e) {
        res.status(400).json({name: "User Role", type: "View", error: e.message})
    }
}

module.exports = {assignRole, removeRole, viewAssignedRoles}