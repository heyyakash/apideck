const express = require('express');
const { controller, getController, postController , deleteController, patchController, bodyController} = require("./ControllerClass")
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors({
    origin: "*"
}));

app.post("/get", (req, res) => {
    const { Endpoint, CatchMessage, Queries } = req.body
    const r = new getController(Endpoint, CatchMessage, Queries)
    const result = r.generate()
    res.status(200).send(result);
});

app.post("/post", (req, res) => {
    const { Endpoint, CatchMessage, Queries, Body } = req.body
    const r = new bodyController(Endpoint, CatchMessage, Queries, Body,'post')
    const result = r.generate()
    res.status(200).send(result);
});

app.post("/delete",(req,res)=>{
    const {Endpoint,CatchMessage,Queries} = req.body
    const r = new deleteController(Endpoint,CatchMessage,Queries)
    const result = r.generate();
    res.status(200).send(result);
})


app.post("/patch", (req, res) => {
    const { Endpoint, CatchMessage, Queries, Body } = req.body
    const r = new bodyController(Endpoint, CatchMessage, Queries, Body,'patch')
    const result = r.generate()
    res.status(200).send(result);
});

app.post("/update", (req, res) => {
    const { Endpoint, CatchMessage, Queries, Body } = req.body
    const r = new bodyController(Endpoint, CatchMessage, Queries, Body,'update')
    const result = r.generate()
    res.status(200).send(result);
});




module.exports = app;