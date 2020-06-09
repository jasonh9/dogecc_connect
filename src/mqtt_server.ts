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
  }
}

export function runMoscaServer(): void {
  const server = new mosca.Server(moscaSettings);

  server.on('ready', setup);

  server.on('clientConnected', function (client: mosca.Client): void {
    console.log('mqtt client connected', client.id);
  });

  server.on('published', function (packet: mosca.Packet): void {
    console.log(packet.topic, packet.payload);
  });

  function setup(): void {
    console.log(`
      -------------------------------
      Mosca server is up and running!
      -------------------------------
  
      Network Interface : ${getIpInterface()}
      Network IP Address : ${getIpInfo()}
      Network Port : ${moscaSettings.port} 
      Application Backend : ${moscaSettings.backend.type}
      `)
  }
}
