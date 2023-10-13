const {
    db,
    Timestamp,
    Filter,
} = require('../database');
const {
    roleConverter,
    Role
} = require("../models/role.model")

const roleCollection = db.collection(`/role/`).withConverter(roleConverter)

/* FOR INSTITUTIONAL ADMINS ONLY */
const addClientRole = async (req, res) => {
    try {
        //console.log(req.body.name)
        let role = new Role(
            req.body.institution,
            req.body.name,
            req.body.desc,
            req.body.canViewMap,
            req.body.canAddMap,
            req.body.canEditMap,
            req.body.canDeleteMap,
            false,
            req.body.canViewSubject,
            req.body.canAddSubject,
            req.body.addSubjectRequireVerification,
            req.body.canEditSubject,
            req.body.editSubjectRequireVerification,
            req.body.canDeleteSubject,
            req.body.canVerifySubject,
            req.body.canViewEvent,
            req.body.canAddEvent,
            req.body.canEditEvent,
            req.body.canDeleteEvent,
            req.body.canVerifyEvent,
            req.body.canViewUser,
            req.body.canAddUser,
            req.body.canEditUser,
            req.body.canDeleteUser,
            false,
            false,
            req.body.canViewGroup,
            req.body.canAddGroup,
            req.body.canEditGroup,
            req.body.canDeletGroup,
            req.body.canViewRole,
            req.body.canAddRole,
            req.body.canEditRole,
            req.body.canDeleteRole,
            false,
            false,
            false,
            false,
            false,
            false,
        )

        console.log(role.name)

        await roleCollection.doc(`${role.institution}-${role.name}`).create(role)
            .then((result) => {
                res.status(200).json({message: "Role added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        //res.status(200).json({message: "Role added successfully"})
    } catch (e) {
        res.status(400).json({name: "Role", userType: "Admin", type: "Add", error: e.message})
    }
}

const editClientRole = (req, res) => {

}

const deleteClientRole = (req, res) => {
    
}

const viewClientRoles = (req, res) => {
    
}

const viewClientRole = (req, res) => {
    
}

/* FOR APPLICATION ADMINS ONLY */
const addAdminRole = async (req, res) => {
    try {
        //console.log(req.body.name)
        let role = new Role(
            null,
            req.body.name,
            req.body.desc,
            req.body.canViewMap,
            req.body.canAddMap,
            req.body.canEditMap,
            req.body.canDeleteMap,
            req.body.canUnlockMap,
            req.body.canViewSubject,
            req.body.canAddSubject,
            req.body.addSubjectRequireVerification,
            req.body.canEditSubject,
            req.body.editSubjectRequireVerification,
            req.body.canDeleteSubject,
            req.body.canVerifySubject,
            req.body.canViewEvent,
            req.body.canAddEvent,
            req.body.canEditEvent,
            req.body.canDeleteEvent,
            req.body.canVerifyEvent,
            req.body.canViewUser,
            req.body.canAddUser,
            req.body.canEditUser,
            req.body.canDeleteUser,
            req.body.canBanUser,
            req.body.canRestoreUser,
            req.body.canViewGroup,
            req.body.canAddGroup,
            req.body.canEditGroup,
            req.body.canDeletGroup,
            req.body.canViewRole,
            req.body.canAddRole,
            req.body.canEditRole,
            req.body.canDeleteRole,
            req.body.canViewInstitution,
            req.body.canAddInstitution,
            req.body.canEditInstitution,
            req.body.canDeleteInstitution,
            req.body.canBanInstitution,
            req.body.canRestoreInstitution,
        )

        await roleCollection.doc(`applicationadmin-${role.name}`).create(role)
            .then((result) => {
                res.status(200).json({message: "Role added successfully"})
            })
            .catch((err) => {
                throw {message: err.message}
            })

        //res.status(200).json({message: "Role added successfully"})
    } catch (e) {
        res.status(400).json({name: "Role", userType: "Admin", type: "Add", error: e.message})
    }
}

const editAdminRole = (req, res) => {
    
}

const deleteAdminRole = (req, res) => {
    
}

const viewAdminRoles = (req, res) => {
    
}

const viewAdminRole = (req, res) => {
    
}

module.exports = {
    addClientRole,
    editClientRole,
    deleteClientRole,
    viewClientRoles,
    viewClientRole,
    addAdminRole,
    editAdminRole,
    deleteAdminRole,
    viewAdminRoles,
    viewAdminRole,
    roleCollection
}