const express = require('express')
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

const userRouter = require("./routes/user")
app.use("/user", userRouter)

const subjectRouter = require("./routes/subject")
app.use("/subject", subjectRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});