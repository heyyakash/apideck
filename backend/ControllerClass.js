class getController {
    constructor(Endpoint,CatchMessage,Queries){
        this.Endpoint = Endpoint
        this.CatchMessage = CatchMessage
        this.Queries = Queries
    }
    generate(){
        return `
            <code classname = "bg-inherit">
            app.get('/${this.Endpoint}',(req,res)=>{<br />
                &ensp;try{<br />
                ${this.Queries.length!==0?`&emsp;{${this.Queries}} = req.query<br />`:``}
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

class postController extends getController {
    constructor(Endpoint,CatchMessage,Queries,Body){
        super(Endpoint,CatchMessage,Queries)
        this.Body = Body
    }
    generate(){
        return `
            <code classname = "bg-inherit">
            app.post('/${this.Endpoint}',(req,res)=>{<br />
                &ensp;try{<br />
                    ${this.Queries.length!==0?`&emsp;{${this.Queries}} = req.query<br />`:``}
                    ${this.Body.length!==0?`&emsp;{${this.Body}} = req.body<br />`:``}
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

class deleteController extends getController {
    constructor(Endpoint , CatchMessage, Queries){
        super (Endpoint,CatchMessage,Queries)
    }
    generate(){
        return `
        <code classname = "bg-inherit">
        app.delete('/${this.Endpoint}',(req,res)=>{<br />
            &ensp;try{<br />
                ${this.Queries.length!==0?`&emsp;{${this.Queries}} = req.query<br />`:``}
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





module.exports = {getController,postController,deleteController}