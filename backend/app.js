const express = require('express');
const controller = require("./test1")
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors({
    origin: "*"
}));

app.post("/",(req,res)=>{
    const r = new controller(true)
//    let name = req.body.ControllerName;
//    let message = req.body.
   const {ControllerName,CatchMessage} = req.body
    const result = r.generate_get(ControllerName , CatchMessage)
    // console.log(r)
    // res.json({data:result})
    // fs.writeFile('./test/test.txt',result , {flag: 'w+'},(err)=>{
    //     console.log(err);
    // });
    console.log(req.body);
    // res.sendFile('./test/test.txt')
    // res.send(result)
    res.status(200).send(result);
});

app.get("/core",(req,res)=>{
    axios.get("https://raw.githubusercontent.com/stormbreaker-project/official_devices/master/team/core.json")
    .then(response=>{
        res.send(response.data);
    })
});

app.get("/maintainers" , (req,res)=>{
    axios.get('https://raw.githubusercontent.com/stormbreaker-project/official_devices/master/team/maintainers.json')
    .then(response =>{
        res.send(response.data);
    })
})



module.exports=app;