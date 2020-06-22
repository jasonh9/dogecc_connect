# DogeCC Connect
An all in one solution to connect your SoC devices, mqtt, redis, websockets

## Component architecture
There are 3 components to this system, a broker, the butler, and the workers.

### Broker
Routes all the streams from the butler to the specified workers.
### Butler
1. Process the requests from the users and sends it to the broker queue for processing.
2. Receives the acknowledgement from the broker and announces the cahnges to all the users.
### Workers
Subscribes to the unique topic relative to its tasks. Once the task is completed send an acknowledgement back to the broker.

## Prerequisites
Redis [Installation Instructions](https://redis.io/topics/quickstart)
> I've included a version of Redis in the `third-party` directory, extract the gzip and run `make` after extracting it. Make sure you run `make test` to test the integrity of the application.  

### Usage
Start the redis server  
`$ redis-server`  

Start the service in dev mode  
`$ npm run-script dev`

### Debug
Flush and clear the cache  
`$ redis-cli FLUSHALL`