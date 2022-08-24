
const net = require('net');

const server = net.createServer()

server.on('connection', (socket)=>
{
    console.log('CLINETE CONECTADO ')
    socket.on('data', (data)=>
    {
        console.log(data)

        console.log('El cliente ' + socket.remoteAddress + ":" + socket.remotePort + " dice: " + data)
        console.log('binary : ' + data.toString('binary'))
        console.log('ascii : ' + data.toString('ascii'))
        console.log('utf-8 : ' + data.toString('utf-8'))
        console.log('base64 : ' + data.toString('base64'))
        console.log('utf16le : ' + data.toString('utf16le'))
        console.log('ucs2  : ' + data.toString('ucs2'))
        console.log('hex : ' + data.toString('hex'))
        //socket.write('Recibido!')
    })

    socket.on('close', ()=>{
        console.log('Comunicación finalizada')
    })

    socket.on('error', (err)=>{
        console.log(err.message)
    })
})

server.listen(7890, ()=>
{
    console.log('servidor esta escuchando en la puerta', server.address().port)
})