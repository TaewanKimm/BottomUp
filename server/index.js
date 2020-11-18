const express = require('express')
const port =  process.env.PORT || 5000
const cors = require('cors')

const asyncify = require('express-asyncify');
const app = asyncify(express());
app.use(cors())  // cors(*)


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

const managerRoute = require("./api/index");
app.use("/manager", managerRoute)


app.get('/', (req, res) => {
  res.send('express 백엔드 정상 동작!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})