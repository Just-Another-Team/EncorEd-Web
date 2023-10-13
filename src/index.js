const express = require('express')
const session = require('express-session')
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

// Will be used later for authorization purposes
// app.use((req, res, next) => {
//     console.log(req.path, res.req.method)
//     console.log(req.headers)
//     next()
// })

// Fix these to admin
const userRouter = require("./routes/user")
const participantRouter = require("./routes/participant")
const subjectRouter = require("./routes/subject")
const institutionRouter = require("./routes/institution")
const eventRouter = require("./routes/event")
const attendeeRouter = require("./routes/attendees")
const roleRouter = require("./routes/role")

app.use("/user", userRouter)
app.use("/participant", participantRouter)
app.use("/subject", subjectRouter)
app.use("/institution", institutionRouter)
app.use("/event", eventRouter)
app.use("/attendees", attendeeRouter)
app.use("/role", roleRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});