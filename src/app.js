//var mqtt = require('./mqtt_server');

var app = require('express')();
var server = require('http').Server(app);
var socket = require('socket.io')(server);

const port = 8001;

socket.on('connection', (client) => {
    console.log('a client connected');

    client.on('bedroom/led/request/brightness', (data)=> {
        // process the request
        console.log(data)
    })

    client.on('bedroom/led/response/brightness', (data) => {
        // respond to the request
        console.log('brightness response triggered')
    })

    client.on('disconnect', () => {
        console.log('a client disconnected')
    })
})

server.listen(port, () => {
    console.log(`listening to *${port}`)
})

//mqtt.helloWorld
