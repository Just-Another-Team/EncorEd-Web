"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// FIND OUT THERE PURPOSE SOON
// const isAuthentication = async (req, res, next) => {
//     const { authorization }= req.headers
//     if (!authorization)
//         return res.status(400).send({message: "Unauthorized"})
//     if (!authorization.startsWith('Bearer'))
//         return res.status(400).send({message: "Unauthorized"})
//     const splitAuth = authorization.split('Bearer ')
//     if (splitAuth.lenth !== 2)
//         return res.status(400).send({message: "Unauthorized"})
//     const token = splitAuth[1]
//     try {
//         const decodedToken = await adminAuth.verifyIdToken(token)
//         console.log("decodedToken", JSON.stringify(decodedToken))
//         res.locals = {...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email}
//         return next()
//     } catch (error) {
//         console.error(`${error.code} - ${error.message}`)
//         return res.status(400).json({name: "User", error: "Authentication Error", type: e.type, message: e.message})
//     }
// }
// module.exports = isAuthentication
//# sourceMappingURL=authenticated.js.map