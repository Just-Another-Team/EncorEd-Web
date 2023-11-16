
// FIND OUT THERE PURPOSE SOON

// const isAuthorized = (hasRole = [], allowSameUser) => {
//     return (req, res, next) => {
//         const {role, email, uid} = res.locals
//         const {id} = req.params

//         //Please remove when done
//         if (email === 'gabrielalpha98@gmail.com')
//             return next()

//         if (allowSameUser && id && uid === id)
//             return next()

//         if (!role)
//             return res.status(400).send()

//         if (hasRole.includes(role))
//             return next()

//         return res.status(403).send()
//     }
// }

// module.exports = isAuthorized