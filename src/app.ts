import { MqttServerHelper } from './mqttBroker';
import { getPackedSettings } from 'http2';
const mqtt = new MqttServerHelper();
mqtt.runMoscaServer();

const moscaServerObj = mqtt.getServerObject()

// moscaServerObj.subscribe('/test/room/light', () => {

//     console.log('testing and test')
// }, ()=> {})

moscaServerObj.on('/test/room/light', () => {
    console.log('test')
})

moscaServerObj.on('message', (packet : any) => {
    console.log(packet)
})