class controller {
    constructor(get,post,patch,del,tc){
        this.get = get
        this.post = post
        this.patch = patch
        this.del = del,
        this.tc=tc
    }
    generate_get (endpoint , message){
          this.endpoint = endpoint;
          this.message = message;
        return `app.get('/${endpoint}',(req,res)=>
        {<br>&emsp;try{<br>&emsp;&emsp;{query} = req.query<br>res.send("Hello")<br>}catch (err){<br>res.status("$add_your_status_code$").json({"message":${message}})<br>}<br>});`
    }

}

class getController {
    constructor(Endpoint,CatchMessage,Queries){
        this.Endpoint = Endpoint
        this.CatchMessage = CatchMessage
        this.Queries = Queries
    }
    generate(){
        return `
            <code>
            app.get('/${this.endpoint}',(req,res)=>{<br />
                &ensp;try{<br />
                    &emsp;{${this.Queries?.map((q)=>q)}} = req.query<br />
                    &emsp;res.status(200).json({success:true})<br />
                &ensp;}<br />
                &ensp;catch(err){<br />
                    &emsp;res.status(500).json({msg:${this.CatchMessage}})<br />
                &ensp;}<br />
            )
            </code>
        `
    }
}

module.exports = {controller,getController}