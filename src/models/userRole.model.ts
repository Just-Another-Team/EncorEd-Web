// import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

// class UserRole {
//     private _userId: string | null;
//     private _roleId: string | null;

//     constructor(
//         _userId: string | null,
//         _roleId: string | null
//     ) {
//         this.userId = _userId
//         this.roleId = _roleId
//     }

//     get userId() {
//         return this._userId;
//     }

//     set userId(value) {
//         this._userId = value;
//     }

//     get roleId() {
//         return this._roleId;
//     }

//     set roleId(value) {
//         this._roleId = value;
//     }
// }

// //Converter must not have email and password
// const userRoleConverter = {
//     toFirestore: (userRole: UserRole) => {
//         return {
//             userId: userRole.userId,
//             roleId: userRole.roleId
//         }
//     },
//     fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
//         const data = snapshot.data(options)

//         let userRole = new UserRole(
//             data.userId,
//             data.roleId
//         );

//         return userRole
//     }
// }

// export {UserRole, userRoleConverter}

export default interface IUserRole {
    id?: string;
    userId: string;
    roleId: string;
}