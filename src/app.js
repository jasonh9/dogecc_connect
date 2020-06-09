// include app config
const config = require('./config')

// include express
var app = require('express')();
var server = require('http').Server(app);

// include socket.io
var socket = require('socket.io')(server);

// start the mqtt server
var mqttServer = require('./mqtt_server');

// mqtt client
var mqtt = require('mqtt')
var mqttClient = mqtt.connect(config.default.MQTT_CLIENT_URL)

// websocket port
const port = 8001;

// bedroom_led status
const bedroom_led = {
    brightness : 0
}

mqttClient.on('message', function (topic, message, packet) {
    /* message is Buffer */
    console.log(`
        topic : ${topic}
        message : ${message.toString()}
        packet : ${packet.payload}
    `);
});

mqttClient.subscribe(config.default.LED_LIGHT_RESPONSE);

socket.on('connection', (client) => {

    const increaseBrightness = (value) => {
        mqttClient.publish('bedroom/led/set/brightness/up', value.toString())
    }

    console.log('a client connected');

    client.on('bedroom/led/set/brightness/up', (data) => {
        typeof(data) === 'number'
            ? increaseBrightness(data)
            : console.error('not a number')
        console.log('bedroom/led/set/brightness/up', data)
    })

    client.on('bedroom/led/set/brightness/down', (data) => {
        typeof(data) === 'number' && bedroom_led.brightness > 0
            ? bedroom_led.brightness -= data
            : bedroom_led.brightness < 10
                ? console.error('request is less than 0')
                : console.error('request is not a number')
        console.log('bedroom/led/set/brightness/down', bedroom_led.brightness)
    })

    client.on('disconnect', () => {
        console.log('a client disconnected')
    })
})

server.listen(port, () => {
    console.log(`listening to *${port}`)
})

