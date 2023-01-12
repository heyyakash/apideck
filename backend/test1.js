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
        return `app.get('/${endpoint}',(req,res)=>{<br>try{<br>res.send("Hello");<br>}catch (err){<br>res.status("$add_your_status_code$").json({"message":${message}})<br>}<br>});`




    }

}

module.exports = controller