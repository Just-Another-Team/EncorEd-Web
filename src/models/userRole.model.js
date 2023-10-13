
class UserRole {
    constructor(_userId, _roleId) {
        this.userId = _userId
        this.roleId = _roleId
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get roleId() {
        return this._roleId;
    }

    set roleId(value) {
        this._roleId = value;
    }
}

//Converter must not have email and password
const userRoleConverter = {
    toFirestore: (userRole) => {
        return {
            userId: userRole.userId,
            roleId: userRole.roleId
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)

        let userRole = new UserRole(
            data.userId,
            data.roleId
        );

        return userRole
    }
}

module.exports = {UserRole, userRoleConverter}