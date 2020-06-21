import mosca from 'mosca';
import { getIpInfo, getIpInterface } from './utils/networkInterface';

const redisServerSettings = {
  type: 'redis',
  redis: require('redis'),
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
}

const moscaSettings = {
  port: 4883,
  backend: redisServerSettings,
  persistence: {
    factory: mosca.persistence.Redis,
    port: 6379,
    host: 'localhost'
  },
  http: {
    port: 1337,
    bundle: true,
    static: './'
  }
}

export class MqttServerHelper {
  server = new mosca.Server(moscaSettings);

  runMoscaServer(): void {
  
    this.server.on('ready', setup);

    this.server.on('clientConnected', function (client: mosca.Client): void {
      console.log('mqtt client connected', client.id);
    });
  
    this.server.on('published', function (packet: mosca.Packet): void {
      // console.log(packet.topic, packet.payload.toString());
    });
  
    function setup(): void {
      
      console.log(`
        -------------------------------
        Mosca server is up and running!
        -------------------------------
    
        Network Interface : ${getIpInterface()}
        Network IP Address : ${getIpInfo()}
        MQTT Port : ${moscaSettings.port} 
        WebSock Port : ${moscaSettings.http.port} 
        Application Backend : ${moscaSettings.backend.type}
        `)
    }
  }

  getServerObject() : mosca.Server {
    return this.server
  }

}