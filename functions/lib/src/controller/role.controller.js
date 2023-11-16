"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCollection = void 0;
const database_1 = require("../database");
const converter_1 = require("../models/converter");
const userRole_controller_1 = require("./userRole.controller");
const user_controller_1 = require("./user.controller");
const roleCollection = database_1.db.collection(`/role/`).withConverter((0, converter_1.converter)());
exports.roleCollection = roleCollection;
class RoleUser {
    add(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Type casting 
                const reqRole = req.body;
                //Identify if each property is undefined
                //AttendancePermissions
                const submitSubjectAttendanceVerification = {
                    value: (_d = (_c = (_b = (_a = reqRole.permission) === null || _a === void 0 ? void 0 : _a.addSubject) === null || _b === void 0 ? void 0 : _b.attendance) === null || _c === void 0 ? void 0 : _c.verifyAttendance) === null || _d === void 0 ? void 0 : _d.value,
                    by: (_h = (_g = (_f = (_e = reqRole.permission) === null || _e === void 0 ? void 0 : _e.addSubject) === null || _f === void 0 ? void 0 : _f.attendance) === null || _g === void 0 ? void 0 : _g.verifyAttendance) === null || _h === void 0 ? void 0 : _h.by
                };
                const submitEventAttendanceVerification = {
                    value: (_m = (_l = (_k = (_j = reqRole.permission) === null || _j === void 0 ? void 0 : _j.addSubject) === null || _k === void 0 ? void 0 : _k.attendance) === null || _l === void 0 ? void 0 : _l.verifyAttendance) === null || _m === void 0 ? void 0 : _m.value,
                    by: (_r = (_q = (_p = (_o = reqRole.permission) === null || _o === void 0 ? void 0 : _o.addSubject) === null || _p === void 0 ? void 0 : _p.attendance) === null || _q === void 0 ? void 0 : _q.verifyAttendance) === null || _r === void 0 ? void 0 : _r.by
                };
                //VerificationPermissions
                const submitSubjectAttendance = {
                    value: (_u = (_t = (_s = reqRole.permission) === null || _s === void 0 ? void 0 : _s.addSubject) === null || _t === void 0 ? void 0 : _t.attendance) === null || _u === void 0 ? void 0 : _u.value,
                    verifyAttendance: submitEventAttendanceVerification
                };
                const submitEventAttendance = {
                    value: (_x = (_w = (_v = reqRole.permission) === null || _v === void 0 ? void 0 : _v.addEvent) === null || _w === void 0 ? void 0 : _w.attendance) === null || _x === void 0 ? void 0 : _x.value,
                    verifyAttendance: submitSubjectAttendanceVerification
                };
                const viewSubjectPermission = {
                    value: (_z = (_y = reqRole.permission) === null || _y === void 0 ? void 0 : _y.viewSubject) === null || _z === void 0 ? void 0 : _z.value,
                    schedule: (_1 = (_0 = reqRole.permission) === null || _0 === void 0 ? void 0 : _0.viewSubject) === null || _1 === void 0 ? void 0 : _1.schedule,
                    participants: (_3 = (_2 = reqRole.permission) === null || _2 === void 0 ? void 0 : _2.viewSubject) === null || _3 === void 0 ? void 0 : _3.participants,
                    attendance: (_5 = (_4 = reqRole.permission) === null || _4 === void 0 ? void 0 : _4.viewSubject) === null || _5 === void 0 ? void 0 : _5.attendance,
                    verify: {
                        value: (_8 = (_7 = (_6 = reqRole.permission) === null || _6 === void 0 ? void 0 : _6.viewSubject) === null || _7 === void 0 ? void 0 : _7.verify) === null || _8 === void 0 ? void 0 : _8.value,
                        by: (_11 = (_10 = (_9 = reqRole.permission) === null || _9 === void 0 ? void 0 : _9.viewSubject) === null || _10 === void 0 ? void 0 : _10.verify) === null || _11 === void 0 ? void 0 : _11.by
                    }
                };
                const addSubjectPermission = {
                    value: (_13 = (_12 = reqRole.permission) === null || _12 === void 0 ? void 0 : _12.addSubject) === null || _13 === void 0 ? void 0 : _13.value,
                    schedule: (_15 = (_14 = reqRole.permission) === null || _14 === void 0 ? void 0 : _14.addSubject) === null || _15 === void 0 ? void 0 : _15.schedule,
                    participants: (_17 = (_16 = reqRole.permission) === null || _16 === void 0 ? void 0 : _16.addSubject) === null || _17 === void 0 ? void 0 : _17.participants,
                    attendance: submitSubjectAttendance,
                    verify: {
                        value: (_20 = (_19 = (_18 = reqRole.permission) === null || _18 === void 0 ? void 0 : _18.addSubject) === null || _19 === void 0 ? void 0 : _19.verify) === null || _20 === void 0 ? void 0 : _20.value,
                        by: (_23 = (_22 = (_21 = reqRole.permission) === null || _21 === void 0 ? void 0 : _21.addSubject) === null || _22 === void 0 ? void 0 : _22.verify) === null || _23 === void 0 ? void 0 : _23.by
                    }
                };
                const editSubjectPermission = {
                    value: (_25 = (_24 = reqRole.permission) === null || _24 === void 0 ? void 0 : _24.editSubject) === null || _25 === void 0 ? void 0 : _25.value,
                    schedule: (_27 = (_26 = reqRole.permission) === null || _26 === void 0 ? void 0 : _26.editSubject) === null || _27 === void 0 ? void 0 : _27.schedule,
                    participants: (_29 = (_28 = reqRole.permission) === null || _28 === void 0 ? void 0 : _28.editSubject) === null || _29 === void 0 ? void 0 : _29.participants,
                    attendance: (_31 = (_30 = reqRole.permission) === null || _30 === void 0 ? void 0 : _30.editSubject) === null || _31 === void 0 ? void 0 : _31.attendance,
                    verify: {
                        value: (_34 = (_33 = (_32 = reqRole.permission) === null || _32 === void 0 ? void 0 : _32.editSubject) === null || _33 === void 0 ? void 0 : _33.verify) === null || _34 === void 0 ? void 0 : _34.value,
                        by: (_37 = (_36 = (_35 = reqRole.permission) === null || _35 === void 0 ? void 0 : _35.editSubject) === null || _36 === void 0 ? void 0 : _36.verify) === null || _37 === void 0 ? void 0 : _37.by
                    }
                };
                const deleteSubjectPermission = {
                    value: (_39 = (_38 = reqRole.permission) === null || _38 === void 0 ? void 0 : _38.deleteSubject) === null || _39 === void 0 ? void 0 : _39.value,
                    schedule: (_41 = (_40 = reqRole.permission) === null || _40 === void 0 ? void 0 : _40.deleteSubject) === null || _41 === void 0 ? void 0 : _41.schedule,
                    participants: (_43 = (_42 = reqRole.permission) === null || _42 === void 0 ? void 0 : _42.deleteSubject) === null || _43 === void 0 ? void 0 : _43.participants,
                    attendance: (_45 = (_44 = reqRole.permission) === null || _44 === void 0 ? void 0 : _44.deleteSubject) === null || _45 === void 0 ? void 0 : _45.attendance,
                    verify: {
                        value: (_48 = (_47 = (_46 = reqRole.permission) === null || _46 === void 0 ? void 0 : _46.deleteSubject) === null || _47 === void 0 ? void 0 : _47.verify) === null || _48 === void 0 ? void 0 : _48.value,
                        by: (_51 = (_50 = (_49 = reqRole.permission) === null || _49 === void 0 ? void 0 : _49.deleteSubject) === null || _50 === void 0 ? void 0 : _50.verify) === null || _51 === void 0 ? void 0 : _51.by
                    }
                };
                const viewEventPermission = {
                    value: (_53 = (_52 = reqRole.permission) === null || _52 === void 0 ? void 0 : _52.viewEvent) === null || _53 === void 0 ? void 0 : _53.value,
                    schedule: (_55 = (_54 = reqRole.permission) === null || _54 === void 0 ? void 0 : _54.viewEvent) === null || _55 === void 0 ? void 0 : _55.schedule,
                    participants: (_57 = (_56 = reqRole.permission) === null || _56 === void 0 ? void 0 : _56.viewEvent) === null || _57 === void 0 ? void 0 : _57.participants,
                    attendance: (_59 = (_58 = reqRole.permission) === null || _58 === void 0 ? void 0 : _58.viewEvent) === null || _59 === void 0 ? void 0 : _59.attendance,
                    verify: {
                        value: (_62 = (_61 = (_60 = reqRole.permission) === null || _60 === void 0 ? void 0 : _60.viewEvent) === null || _61 === void 0 ? void 0 : _61.verify) === null || _62 === void 0 ? void 0 : _62.value,
                        by: (_65 = (_64 = (_63 = reqRole.permission) === null || _63 === void 0 ? void 0 : _63.viewEvent) === null || _64 === void 0 ? void 0 : _64.verify) === null || _65 === void 0 ? void 0 : _65.by
                    }
                };
                const addEventPermission = {
                    value: (_67 = (_66 = reqRole.permission) === null || _66 === void 0 ? void 0 : _66.addEvent) === null || _67 === void 0 ? void 0 : _67.value,
                    schedule: (_69 = (_68 = reqRole.permission) === null || _68 === void 0 ? void 0 : _68.addEvent) === null || _69 === void 0 ? void 0 : _69.schedule,
                    participants: (_71 = (_70 = reqRole.permission) === null || _70 === void 0 ? void 0 : _70.addEvent) === null || _71 === void 0 ? void 0 : _71.participants,
                    attendance: submitEventAttendance,
                    verify: {
                        value: (_74 = (_73 = (_72 = reqRole.permission) === null || _72 === void 0 ? void 0 : _72.addEvent) === null || _73 === void 0 ? void 0 : _73.verify) === null || _74 === void 0 ? void 0 : _74.value,
                        by: (_77 = (_76 = (_75 = reqRole.permission) === null || _75 === void 0 ? void 0 : _75.addEvent) === null || _76 === void 0 ? void 0 : _76.verify) === null || _77 === void 0 ? void 0 : _77.by
                    }
                };
                const editEventPermission = {
                    value: (_79 = (_78 = reqRole.permission) === null || _78 === void 0 ? void 0 : _78.editEvent) === null || _79 === void 0 ? void 0 : _79.value,
                    schedule: (_81 = (_80 = reqRole.permission) === null || _80 === void 0 ? void 0 : _80.editEvent) === null || _81 === void 0 ? void 0 : _81.schedule,
                    participants: (_83 = (_82 = reqRole.permission) === null || _82 === void 0 ? void 0 : _82.editEvent) === null || _83 === void 0 ? void 0 : _83.participants,
                    attendance: (_85 = (_84 = reqRole.permission) === null || _84 === void 0 ? void 0 : _84.editEvent) === null || _85 === void 0 ? void 0 : _85.attendance,
                    verify: {
                        value: (_88 = (_87 = (_86 = reqRole.permission) === null || _86 === void 0 ? void 0 : _86.editEvent) === null || _87 === void 0 ? void 0 : _87.verify) === null || _88 === void 0 ? void 0 : _88.value,
                        by: (_91 = (_90 = (_89 = reqRole.permission) === null || _89 === void 0 ? void 0 : _89.editEvent) === null || _90 === void 0 ? void 0 : _90.verify) === null || _91 === void 0 ? void 0 : _91.by
                    }
                };
                const deleteEventctPermission = {
                    value: (_93 = (_92 = reqRole.permission) === null || _92 === void 0 ? void 0 : _92.deleteEvent) === null || _93 === void 0 ? void 0 : _93.value,
                    schedule: (_95 = (_94 = reqRole.permission) === null || _94 === void 0 ? void 0 : _94.deleteEvent) === null || _95 === void 0 ? void 0 : _95.schedule,
                    participants: (_97 = (_96 = reqRole.permission) === null || _96 === void 0 ? void 0 : _96.deleteEvent) === null || _97 === void 0 ? void 0 : _97.participants,
                    attendance: (_99 = (_98 = reqRole.permission) === null || _98 === void 0 ? void 0 : _98.deleteEvent) === null || _99 === void 0 ? void 0 : _99.attendance,
                    verify: {
                        value: (_102 = (_101 = (_100 = reqRole.permission) === null || _100 === void 0 ? void 0 : _100.deleteEvent) === null || _101 === void 0 ? void 0 : _101.verify) === null || _102 === void 0 ? void 0 : _102.value,
                        by: (_105 = (_104 = (_103 = reqRole.permission) === null || _103 === void 0 ? void 0 : _103.deleteEvent) === null || _104 === void 0 ? void 0 : _104.verify) === null || _105 === void 0 ? void 0 : _105.by
                    }
                };
                const permission = {
                    viewMap: (_106 = reqRole.permission) === null || _106 === void 0 ? void 0 : _106.viewMap,
                    addMap: (_107 = reqRole.permission) === null || _107 === void 0 ? void 0 : _107.addMap,
                    editMap: (_108 = reqRole.permission) === null || _108 === void 0 ? void 0 : _108.editMap,
                    deleteMap: (_109 = reqRole.permission) === null || _109 === void 0 ? void 0 : _109.deleteMap,
                    unlockMap: (_110 = reqRole.permission) === null || _110 === void 0 ? void 0 : _110.unlockMap,
                    viewSubject: viewSubjectPermission,
                    addSubject: addSubjectPermission,
                    editSubject: editSubjectPermission,
                    deleteSubject: deleteSubjectPermission,
                    viewEvent: viewEventPermission,
                    addEvent: addEventPermission,
                    editEvent: editEventPermission,
                    deleteEvent: deleteEventctPermission,
                    viewUser: (_111 = reqRole.permission) === null || _111 === void 0 ? void 0 : _111.viewUser,
                    addUser: (_112 = reqRole.permission) === null || _112 === void 0 ? void 0 : _112.addUser,
                    editUser: (_113 = reqRole.permission) === null || _113 === void 0 ? void 0 : _113.editUser,
                    deleteUser: (_114 = reqRole.permission) === null || _114 === void 0 ? void 0 : _114.deleteUser,
                    verifyUser: {
                        value: (_116 = (_115 = reqRole.permission) === null || _115 === void 0 ? void 0 : _115.verifyUser) === null || _116 === void 0 ? void 0 : _116.value,
                        by: (_118 = (_117 = reqRole.permission) === null || _117 === void 0 ? void 0 : _117.verifyUser) === null || _118 === void 0 ? void 0 : _118.by
                    },
                    viewGroup: (_119 = reqRole.permission) === null || _119 === void 0 ? void 0 : _119.viewGroup,
                    addGroup: (_120 = reqRole.permission) === null || _120 === void 0 ? void 0 : _120.addGroup,
                    editGroup: (_121 = reqRole.permission) === null || _121 === void 0 ? void 0 : _121.editGroup,
                    deleteGroup: (_122 = reqRole.permission) === null || _122 === void 0 ? void 0 : _122.deleteGroup,
                    verifyGroup: {
                        value: (_124 = (_123 = reqRole.permission) === null || _123 === void 0 ? void 0 : _123.verifyGroup) === null || _124 === void 0 ? void 0 : _124.value,
                        by: (_126 = (_125 = reqRole.permission) === null || _125 === void 0 ? void 0 : _125.verifyGroup) === null || _126 === void 0 ? void 0 : _126.by,
                    },
                    viewRole: (_127 = reqRole.permission) === null || _127 === void 0 ? void 0 : _127.viewRole,
                    addRole: (_128 = reqRole.permission) === null || _128 === void 0 ? void 0 : _128.addRole,
                    editRole: (_129 = reqRole.permission) === null || _129 === void 0 ? void 0 : _129.editRole,
                    deleteRole: (_130 = reqRole.permission) === null || _130 === void 0 ? void 0 : _130.deleteRole,
                    verifyRole: {
                        value: (_132 = (_131 = reqRole.permission) === null || _131 === void 0 ? void 0 : _131.verifyRole) === null || _132 === void 0 ? void 0 : _132.value,
                        by: (_134 = (_133 = reqRole.permission) === null || _133 === void 0 ? void 0 : _133.verifyRole) === null || _134 === void 0 ? void 0 : _134.by
                    },
                    viewInstitution: (_135 = reqRole.permission) === null || _135 === void 0 ? void 0 : _135.viewInstitution
                };
                const role = {
                    name: reqRole.name,
                    desc: reqRole.desc,
                    //type: reqRole.type, < For identifying only
                    institution: reqRole.institution.toLowerCase().trim().replace(/\s/g, ''),
                    appAdmin: reqRole.type === "appAdmin" ? true : false,
                    admin: reqRole.type === "admin" ? true : false,
                    employee: reqRole.type === "employee" ? permission : false,
                    teacher: reqRole.type === "teacher" ? permission : false,
                    student: reqRole.type === "student" ? permission : false,
                    visitor: reqRole.type === "visitor" ? permission : false,
                    creationDate: new Date().toISOString(),
                    createdBy: reqRole.createdBy,
                    updatedDate: new Date().toISOString(),
                    updatedBy: reqRole.createdBy,
                    status: "Open"
                };
                let institution = role.institution;
                let name = role.name.toLowerCase().trim().replace(/\s/g, '');
                yield roleCollection.doc(`${institution}-${name}`).create(role);
                res.status(200).json({ message: "Role successfully added!" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "Role", userType: "User", type: "Add", message: error.message });
            }
        });
    }
    update(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135;
        return __awaiter(this, void 0, void 0, function* () {
            const roleIdparam = req.params.id;
            try {
                const roleDoc = roleCollection.doc(roleIdparam);
                const reqRole = req.body;
                const oldRole = yield roleDoc.get().then(role => (Object.assign({ id: role.id }, role.data())));
                //AttendancePermissions
                const submitSubjectAttendanceVerification = {
                    value: (_d = (_c = (_b = (_a = reqRole.permission) === null || _a === void 0 ? void 0 : _a.addSubject) === null || _b === void 0 ? void 0 : _b.attendance) === null || _c === void 0 ? void 0 : _c.verifyAttendance) === null || _d === void 0 ? void 0 : _d.value,
                    by: (_h = (_g = (_f = (_e = reqRole.permission) === null || _e === void 0 ? void 0 : _e.addSubject) === null || _f === void 0 ? void 0 : _f.attendance) === null || _g === void 0 ? void 0 : _g.verifyAttendance) === null || _h === void 0 ? void 0 : _h.by
                };
                const submitEventAttendanceVerification = {
                    value: (_m = (_l = (_k = (_j = reqRole.permission) === null || _j === void 0 ? void 0 : _j.addSubject) === null || _k === void 0 ? void 0 : _k.attendance) === null || _l === void 0 ? void 0 : _l.verifyAttendance) === null || _m === void 0 ? void 0 : _m.value,
                    by: (_r = (_q = (_p = (_o = reqRole.permission) === null || _o === void 0 ? void 0 : _o.addSubject) === null || _p === void 0 ? void 0 : _p.attendance) === null || _q === void 0 ? void 0 : _q.verifyAttendance) === null || _r === void 0 ? void 0 : _r.by
                };
                //VerificationPermissions
                const submitSubjectAttendance = {
                    value: (_u = (_t = (_s = reqRole.permission) === null || _s === void 0 ? void 0 : _s.addSubject) === null || _t === void 0 ? void 0 : _t.attendance) === null || _u === void 0 ? void 0 : _u.value,
                    verifyAttendance: submitEventAttendanceVerification
                };
                const submitEventAttendance = {
                    value: (_x = (_w = (_v = reqRole.permission) === null || _v === void 0 ? void 0 : _v.addEvent) === null || _w === void 0 ? void 0 : _w.attendance) === null || _x === void 0 ? void 0 : _x.value,
                    verifyAttendance: submitSubjectAttendanceVerification
                };
                const viewSubjectPermission = {
                    value: (_z = (_y = reqRole.permission) === null || _y === void 0 ? void 0 : _y.viewSubject) === null || _z === void 0 ? void 0 : _z.value,
                    schedule: (_1 = (_0 = reqRole.permission) === null || _0 === void 0 ? void 0 : _0.viewSubject) === null || _1 === void 0 ? void 0 : _1.schedule,
                    participants: (_3 = (_2 = reqRole.permission) === null || _2 === void 0 ? void 0 : _2.viewSubject) === null || _3 === void 0 ? void 0 : _3.participants,
                    attendance: (_5 = (_4 = reqRole.permission) === null || _4 === void 0 ? void 0 : _4.viewSubject) === null || _5 === void 0 ? void 0 : _5.attendance,
                    verify: {
                        value: (_8 = (_7 = (_6 = reqRole.permission) === null || _6 === void 0 ? void 0 : _6.viewSubject) === null || _7 === void 0 ? void 0 : _7.verify) === null || _8 === void 0 ? void 0 : _8.value,
                        by: (_11 = (_10 = (_9 = reqRole.permission) === null || _9 === void 0 ? void 0 : _9.viewSubject) === null || _10 === void 0 ? void 0 : _10.verify) === null || _11 === void 0 ? void 0 : _11.by
                    }
                };
                const addSubjectPermission = {
                    value: (_13 = (_12 = reqRole.permission) === null || _12 === void 0 ? void 0 : _12.addSubject) === null || _13 === void 0 ? void 0 : _13.value,
                    schedule: (_15 = (_14 = reqRole.permission) === null || _14 === void 0 ? void 0 : _14.addSubject) === null || _15 === void 0 ? void 0 : _15.schedule,
                    participants: (_17 = (_16 = reqRole.permission) === null || _16 === void 0 ? void 0 : _16.addSubject) === null || _17 === void 0 ? void 0 : _17.participants,
                    attendance: submitSubjectAttendance,
                    verify: {
                        value: (_20 = (_19 = (_18 = reqRole.permission) === null || _18 === void 0 ? void 0 : _18.addSubject) === null || _19 === void 0 ? void 0 : _19.verify) === null || _20 === void 0 ? void 0 : _20.value,
                        by: (_23 = (_22 = (_21 = reqRole.permission) === null || _21 === void 0 ? void 0 : _21.addSubject) === null || _22 === void 0 ? void 0 : _22.verify) === null || _23 === void 0 ? void 0 : _23.by
                    }
                };
                const editSubjectPermission = {
                    value: (_25 = (_24 = reqRole.permission) === null || _24 === void 0 ? void 0 : _24.editSubject) === null || _25 === void 0 ? void 0 : _25.value,
                    schedule: (_27 = (_26 = reqRole.permission) === null || _26 === void 0 ? void 0 : _26.editSubject) === null || _27 === void 0 ? void 0 : _27.schedule,
                    participants: (_29 = (_28 = reqRole.permission) === null || _28 === void 0 ? void 0 : _28.editSubject) === null || _29 === void 0 ? void 0 : _29.participants,
                    attendance: (_31 = (_30 = reqRole.permission) === null || _30 === void 0 ? void 0 : _30.editSubject) === null || _31 === void 0 ? void 0 : _31.attendance,
                    verify: {
                        value: (_34 = (_33 = (_32 = reqRole.permission) === null || _32 === void 0 ? void 0 : _32.editSubject) === null || _33 === void 0 ? void 0 : _33.verify) === null || _34 === void 0 ? void 0 : _34.value,
                        by: (_37 = (_36 = (_35 = reqRole.permission) === null || _35 === void 0 ? void 0 : _35.editSubject) === null || _36 === void 0 ? void 0 : _36.verify) === null || _37 === void 0 ? void 0 : _37.by
                    }
                };
                const deleteSubjectPermission = {
                    value: (_39 = (_38 = reqRole.permission) === null || _38 === void 0 ? void 0 : _38.deleteSubject) === null || _39 === void 0 ? void 0 : _39.value,
                    schedule: (_41 = (_40 = reqRole.permission) === null || _40 === void 0 ? void 0 : _40.deleteSubject) === null || _41 === void 0 ? void 0 : _41.schedule,
                    participants: (_43 = (_42 = reqRole.permission) === null || _42 === void 0 ? void 0 : _42.deleteSubject) === null || _43 === void 0 ? void 0 : _43.participants,
                    attendance: (_45 = (_44 = reqRole.permission) === null || _44 === void 0 ? void 0 : _44.deleteSubject) === null || _45 === void 0 ? void 0 : _45.attendance,
                    verify: {
                        value: (_48 = (_47 = (_46 = reqRole.permission) === null || _46 === void 0 ? void 0 : _46.deleteSubject) === null || _47 === void 0 ? void 0 : _47.verify) === null || _48 === void 0 ? void 0 : _48.value,
                        by: (_51 = (_50 = (_49 = reqRole.permission) === null || _49 === void 0 ? void 0 : _49.deleteSubject) === null || _50 === void 0 ? void 0 : _50.verify) === null || _51 === void 0 ? void 0 : _51.by
                    }
                };
                const viewEventPermission = {
                    value: (_53 = (_52 = reqRole.permission) === null || _52 === void 0 ? void 0 : _52.viewEvent) === null || _53 === void 0 ? void 0 : _53.value,
                    schedule: (_55 = (_54 = reqRole.permission) === null || _54 === void 0 ? void 0 : _54.viewEvent) === null || _55 === void 0 ? void 0 : _55.schedule,
                    participants: (_57 = (_56 = reqRole.permission) === null || _56 === void 0 ? void 0 : _56.viewEvent) === null || _57 === void 0 ? void 0 : _57.participants,
                    attendance: (_59 = (_58 = reqRole.permission) === null || _58 === void 0 ? void 0 : _58.viewEvent) === null || _59 === void 0 ? void 0 : _59.attendance,
                    verify: {
                        value: (_62 = (_61 = (_60 = reqRole.permission) === null || _60 === void 0 ? void 0 : _60.viewEvent) === null || _61 === void 0 ? void 0 : _61.verify) === null || _62 === void 0 ? void 0 : _62.value,
                        by: (_65 = (_64 = (_63 = reqRole.permission) === null || _63 === void 0 ? void 0 : _63.viewEvent) === null || _64 === void 0 ? void 0 : _64.verify) === null || _65 === void 0 ? void 0 : _65.by
                    }
                };
                const addEventPermission = {
                    value: (_67 = (_66 = reqRole.permission) === null || _66 === void 0 ? void 0 : _66.addEvent) === null || _67 === void 0 ? void 0 : _67.value,
                    schedule: (_69 = (_68 = reqRole.permission) === null || _68 === void 0 ? void 0 : _68.addEvent) === null || _69 === void 0 ? void 0 : _69.schedule,
                    participants: (_71 = (_70 = reqRole.permission) === null || _70 === void 0 ? void 0 : _70.addEvent) === null || _71 === void 0 ? void 0 : _71.participants,
                    attendance: submitEventAttendance,
                    verify: {
                        value: (_74 = (_73 = (_72 = reqRole.permission) === null || _72 === void 0 ? void 0 : _72.addEvent) === null || _73 === void 0 ? void 0 : _73.verify) === null || _74 === void 0 ? void 0 : _74.value,
                        by: (_77 = (_76 = (_75 = reqRole.permission) === null || _75 === void 0 ? void 0 : _75.addEvent) === null || _76 === void 0 ? void 0 : _76.verify) === null || _77 === void 0 ? void 0 : _77.by
                    }
                };
                const editEventPermission = {
                    value: (_79 = (_78 = reqRole.permission) === null || _78 === void 0 ? void 0 : _78.editEvent) === null || _79 === void 0 ? void 0 : _79.value,
                    schedule: (_81 = (_80 = reqRole.permission) === null || _80 === void 0 ? void 0 : _80.editEvent) === null || _81 === void 0 ? void 0 : _81.schedule,
                    participants: (_83 = (_82 = reqRole.permission) === null || _82 === void 0 ? void 0 : _82.editEvent) === null || _83 === void 0 ? void 0 : _83.participants,
                    attendance: (_85 = (_84 = reqRole.permission) === null || _84 === void 0 ? void 0 : _84.editEvent) === null || _85 === void 0 ? void 0 : _85.attendance,
                    verify: {
                        value: (_88 = (_87 = (_86 = reqRole.permission) === null || _86 === void 0 ? void 0 : _86.editEvent) === null || _87 === void 0 ? void 0 : _87.verify) === null || _88 === void 0 ? void 0 : _88.value,
                        by: (_91 = (_90 = (_89 = reqRole.permission) === null || _89 === void 0 ? void 0 : _89.editEvent) === null || _90 === void 0 ? void 0 : _90.verify) === null || _91 === void 0 ? void 0 : _91.by
                    }
                };
                const deleteEventPermission = {
                    value: (_93 = (_92 = reqRole.permission) === null || _92 === void 0 ? void 0 : _92.deleteEvent) === null || _93 === void 0 ? void 0 : _93.value,
                    schedule: (_95 = (_94 = reqRole.permission) === null || _94 === void 0 ? void 0 : _94.deleteEvent) === null || _95 === void 0 ? void 0 : _95.schedule,
                    participants: (_97 = (_96 = reqRole.permission) === null || _96 === void 0 ? void 0 : _96.deleteEvent) === null || _97 === void 0 ? void 0 : _97.participants,
                    attendance: (_99 = (_98 = reqRole.permission) === null || _98 === void 0 ? void 0 : _98.deleteEvent) === null || _99 === void 0 ? void 0 : _99.attendance,
                    verify: {
                        value: (_102 = (_101 = (_100 = reqRole.permission) === null || _100 === void 0 ? void 0 : _100.deleteEvent) === null || _101 === void 0 ? void 0 : _101.verify) === null || _102 === void 0 ? void 0 : _102.value,
                        by: (_105 = (_104 = (_103 = reqRole.permission) === null || _103 === void 0 ? void 0 : _103.deleteEvent) === null || _104 === void 0 ? void 0 : _104.verify) === null || _105 === void 0 ? void 0 : _105.by
                    }
                };
                const permission = {
                    viewMap: (_106 = reqRole.permission) === null || _106 === void 0 ? void 0 : _106.viewMap,
                    addMap: (_107 = reqRole.permission) === null || _107 === void 0 ? void 0 : _107.addMap,
                    editMap: (_108 = reqRole.permission) === null || _108 === void 0 ? void 0 : _108.editMap,
                    deleteMap: (_109 = reqRole.permission) === null || _109 === void 0 ? void 0 : _109.deleteMap,
                    unlockMap: (_110 = reqRole.permission) === null || _110 === void 0 ? void 0 : _110.unlockMap,
                    viewSubject: viewSubjectPermission,
                    addSubject: addSubjectPermission,
                    editSubject: editSubjectPermission,
                    deleteSubject: deleteSubjectPermission,
                    viewEvent: viewEventPermission,
                    addEvent: addEventPermission,
                    editEvent: editEventPermission,
                    deleteEvent: deleteEventPermission,
                    viewUser: (_111 = reqRole.permission) === null || _111 === void 0 ? void 0 : _111.viewUser,
                    addUser: (_112 = reqRole.permission) === null || _112 === void 0 ? void 0 : _112.addUser,
                    editUser: (_113 = reqRole.permission) === null || _113 === void 0 ? void 0 : _113.editUser,
                    deleteUser: (_114 = reqRole.permission) === null || _114 === void 0 ? void 0 : _114.deleteUser,
                    verifyUser: {
                        value: (_116 = (_115 = reqRole.permission) === null || _115 === void 0 ? void 0 : _115.verifyUser) === null || _116 === void 0 ? void 0 : _116.value,
                        by: (_118 = (_117 = reqRole.permission) === null || _117 === void 0 ? void 0 : _117.verifyUser) === null || _118 === void 0 ? void 0 : _118.by
                    },
                    viewGroup: (_119 = reqRole.permission) === null || _119 === void 0 ? void 0 : _119.viewGroup,
                    addGroup: (_120 = reqRole.permission) === null || _120 === void 0 ? void 0 : _120.addGroup,
                    editGroup: (_121 = reqRole.permission) === null || _121 === void 0 ? void 0 : _121.editGroup,
                    deleteGroup: (_122 = reqRole.permission) === null || _122 === void 0 ? void 0 : _122.deleteGroup,
                    verifyGroup: {
                        value: (_124 = (_123 = reqRole.permission) === null || _123 === void 0 ? void 0 : _123.verifyGroup) === null || _124 === void 0 ? void 0 : _124.value,
                        by: (_126 = (_125 = reqRole.permission) === null || _125 === void 0 ? void 0 : _125.verifyGroup) === null || _126 === void 0 ? void 0 : _126.by,
                    },
                    viewRole: (_127 = reqRole.permission) === null || _127 === void 0 ? void 0 : _127.viewRole,
                    addRole: (_128 = reqRole.permission) === null || _128 === void 0 ? void 0 : _128.addRole,
                    editRole: (_129 = reqRole.permission) === null || _129 === void 0 ? void 0 : _129.editRole,
                    deleteRole: (_130 = reqRole.permission) === null || _130 === void 0 ? void 0 : _130.deleteRole,
                    verifyRole: {
                        value: (_132 = (_131 = reqRole.permission) === null || _131 === void 0 ? void 0 : _131.verifyRole) === null || _132 === void 0 ? void 0 : _132.value,
                        by: (_134 = (_133 = reqRole.permission) === null || _133 === void 0 ? void 0 : _133.verifyRole) === null || _134 === void 0 ? void 0 : _134.by
                    },
                    viewInstitution: (_135 = reqRole.permission) === null || _135 === void 0 ? void 0 : _135.viewInstitution
                };
                const role = {
                    name: reqRole.name,
                    desc: reqRole.desc,
                    //type: reqRole.type, < For identifying only
                    institution: reqRole.institution.toLowerCase().trim().replace(/\s/g, ''),
                    appAdmin: reqRole.type === "appAdmin" ? true : false,
                    admin: reqRole.type === "admin" ? true : false,
                    employee: reqRole.type === "employee" ? permission : false,
                    teacher: reqRole.type === "teacher" ? permission : false,
                    student: reqRole.type === "student" ? permission : false,
                    visitor: reqRole.type === "visitor" ? permission : false,
                    creationDate: oldRole.creationDate,
                    createdBy: oldRole.createdBy,
                    updatedDate: new Date().toISOString(),
                    updatedBy: reqRole.updatedBy,
                    status: "Open"
                };
                let institution = role.institution;
                let name = role.name.toLowerCase().trim().replace(/\s/g, '');
                const newRoleId = `${institution}-${name}`;
                //Update Role Firestore
                yield roleCollection.doc(newRoleId).set(role)
                    .then(() => {
                    console.log("Successfully Updated Role - Firestore (Set)");
                });
                if (oldRole.id !== newRoleId)
                    yield roleDoc.delete()
                        .then(() => {
                        console.log("Successfully Updated Role - Firestore (Delete Old)");
                    });
                //UPDATE USER ROLE
                //Update user Role
                const assignedRoleDocs = yield userRole_controller_1.userRoleCollection.where('roleId', '==', oldRole.id).get();
                // if (assignedRoleDocs.empty)
                //     throw {message: "User Id not found"}
                //Get Roles 
                const assignedRoles = assignedRoleDocs.docs.map((userRole) => {
                    return userRole.data();
                });
                //Delete old user role and assign new based on new userId
                assignedRoles.forEach((userRole) => __awaiter(this, void 0, void 0, function* () {
                    let newUserRole = {
                        // userId: user.email,
                        // roleId: userRole.roleId
                        userId: userRole.userId,
                        roleId: newRoleId
                    };
                    const newId = `${newUserRole.userId}-${newUserRole.roleId}`;
                    // const oldId = `${oldUser.id}-${userRole.roleId}`
                    const oldId = `${userRole.userId}-${oldRole.id}`;
                    yield userRole_controller_1.userRoleCollection.doc(newId).set(newUserRole);
                    if (newId !== oldId)
                        yield userRole_controller_1.userRoleCollection.doc(oldId).delete();
                }));
                res.status(200).json({ message: "Role successfully updated!" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "Role", userType: "User", type: "Add", message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleIdparam = req.params.id;
            //Delete by status
            try {
                yield roleCollection.doc(roleIdparam).delete();
                //Delete User Roles based on the role being deleted
                res.status(200).json({ messsage: "Role deleted successfully" });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "Role", userType: "User", type: "View", message: error.message, stack: error.stack });
            }
        });
    }
    view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Type casting 
                const roleIdparam = req.params.id;
                const role = yield roleCollection.doc(roleIdparam).get()
                    .then((roleRecord) => {
                    return (Object.assign(Object.assign({ id: roleRecord.id }, roleRecord.data()), { creationDate: roleRecord.data().creationDate, updatedDate: roleRecord.data().updatedDate }));
                });
                res.status(200).json(role);
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "Role", userType: "User", type: "View", message: error.message, stack: error.stack });
            }
        });
    }
    viewAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Type casting 
                const roleDoc = yield roleCollection.get();
                const roles = roleDoc.docs.map((roleRecord) => {
                    return (Object.assign(Object.assign({ id: roleRecord.id }, roleRecord.data()), { creationDate: roleRecord.data().creationDate, updatedDate: roleRecord.data().updatedDate }));
                });
                res.status(200).json(roles);
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(400).json({ name: "Role", userType: "User", type: "View", message: error.message, stack: error.stack });
            }
        });
    }
    viewAllByInsitution(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institutionId = req.params.institution;
            try {
                console.log();
                const roleRef = yield roleCollection.where('institution', '==', institutionId).get();
                const roles = roleRef.docs.map((roleRecord) => (Object.assign({ id: roleRecord.id }, roleRecord.data())));
                const userRolesRef = yield userRole_controller_1.userRoleCollection.get();
                const userRoles = userRolesRef.docs.map((userRoleRecord) => (Object.assign({ id: userRoleRecord.id }, userRoleRecord.data())));
                const usersRef = yield user_controller_1.userCollection.get();
                const users = usersRef.docs.map((userRecord) => (Object.assign({ id: userRecord.id }, userRecord.data())));
                const roleOutput = roles.filter(role => !role.admin && !role.appAdmin).map(role => {
                    let usersOutput = [];
                    userRoles.filter(userRole => userRole.roleId == role.id).forEach(userRole => {
                        usersOutput = users.filter(user => user.id == userRole.userId);
                    });
                    return (Object.assign(Object.assign({}, role), { createdBy: users.find(user => user.id === role.createdBy), groupsAssigned: 0, usersAssigned: usersOutput }));
                });
                res.status(200).json(roleOutput);
            }
            catch (error) {
                if (error instanceof Error) {
                    const roleControllerError = {
                        name: "Role",
                        error: true,
                        errorType: "Controller Error",
                        control: "View By Institution",
                        message: error.message
                    };
                    res.status(400).json(roleControllerError); //type: error.type, code: error.code
                }
            }
        });
    }
}
class RoleAdmin {
    add(req, res) {
        throw new Error("Method not implemented.");
    }
    update(req, res) {
        throw new Error("Method not implemented.");
    }
    delete(req, res) {
        throw new Error("Method not implemented.");
    }
    view(req, res) {
        throw new Error("Method not implemented.");
    }
    viewAll(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = new RoleUser;
//# sourceMappingURL=role.controller.js.map