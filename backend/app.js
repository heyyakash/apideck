const express = require('express');
const { controller, getController } = require("./ControllerClass")
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors({
    origin: "*"
}));

app.post("/", (req, res) => {
    const { ControllerName, CatchMessage, Queries } = req.body
    const r = new getController(ControllerName, CatchMessage, Queries)
    const result = r.generate()
    res.status(200).send(result);
});


module.exports = app;