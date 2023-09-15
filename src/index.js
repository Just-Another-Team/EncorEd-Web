const express = require('express')
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

// Will be used later for authorization purposes
app.use((req, res, next) => {
    console.log(req.path, res.req.method)
    console.log(req.headers)
    next()
})

const userRouter = require("./routes/user")
const participantRouter = require("./routes/participant")
const subjectRouter = require("./routes/subject")
const institutionRouter = require("./routes/institution")
const eventRouter = require("./routes/event")
const attendeeRouter = require("./routes/attendees")

app.use("/user", userRouter)
app.use("/participant", participantRouter)
app.use("/subject", subjectRouter)
app.use("/institution", institutionRouter)
app.use("/event", eventRouter)
app.use("/attendees", attendeeRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});