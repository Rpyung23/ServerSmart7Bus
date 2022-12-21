const { Buffer } = require('node:buffer')
const cSocketCliente = require("./pdo/cSocketCliente")
const express = require("express")
const cors = require('cors');
/**CONFIGURACION DE CORS**/
var cors_config = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
const app = express()


const net = require('net');
const server = net.createServer()
let mListaSocketClientes = []

let banderaSendEnvio = true;


app.use(cors(cors_config));
app.use(express.json({limit: '80mb'}));
app.use(express.urlencoded({ extended: false,limit:'80mb' }));

server.on('connection', (socketClient)=>
{
    console.log('NUEVO CLIENTE CONECTADO '+socketClient.remoteAddress)



    //var oS = new cSocketCliente(socket,null)
    /*mListaSocketClientes.push(socket)*/

    socketClient.on('data', (data)=>
    {
        console.log("SOCKET : "+socketClient.remoteAddress+" DATA : ")
        console.log(data)
        console.log("--------------------------------------------------------------------------")
        socketClient.end()

        //oS.insertarTrama(data)
        //oS.imprimirTramaDecodificada()


    })

    socketClient.on('close', ()=>{
        console.log('EL SOCKET CLIENTE HA FINALIZADO LA COMUNICACION')
    })

    socketClient.on('error', (err)=>{
        console.log(err.message)
    })
})

server.on('listening',()=>{
    console.log("SOCKET SERVER LISTENING....")
})


server.on('error',(error)=>{
    console.log("**********************************************************************")
    console.log("SOCKET SERVER ERROR : ....")
    console.log(error)
    console.log(error.message)
    console.log("**********************************************************************")
})

app.post("/sendComando",function (req,res)
{
    console.log("COMANDO RECIVO : "+req.body.comando)
    try {
        if(mListaSocketClientes.length > 0)
        {
            console.log("TAMANIO LISTA SOCKETS : "+mListaSocketClientes.length)
            try{
                console.log("REMOTEADDRESS : "+mListaSocketClientes[mListaSocketClientes.length-1].remoteAddress);
                console.log("ADDRESS : ",mListaSocketClientes[mListaSocketClientes.length-1].address())
                mListaSocketClientes[mListaSocketClientes.length-1].write(req.body.comando)
                res.status(200).json({
                    msm:"comando enviado"
                })

            }catch (e) {
                console.log("TRY CATCH SOCKET.WRITE")
                console.log(e)
            }
        }else{
            res.status(200).json({
                msm:"SOCKETS VACIOS"
            })
        }
    }catch (e) {

        res.status(200).json({
            msm: e.toString()
        })
    }
})

server.listen(7890, ()=>
{
    console.log('SOCKET SERVER LISTEN', server.address().port)
})

app.listen(3001,()=>{
    console.log("REST ONLINE.....")
    console.log('Escuchando por el puerto : '+3001)
})