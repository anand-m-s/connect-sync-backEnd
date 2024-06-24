import {Server} from "http"

const port = process.env.PORT ||5000

const serverConfig = (server:Server)=>{

    const startServer = ()=>{
        server.listen(port,()=>{
            console.log(`server listen on ${port}`.bg_blue.bold)
        })
    }
    return{
        startServer
    }
}

export default serverConfig