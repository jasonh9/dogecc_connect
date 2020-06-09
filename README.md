# DogeCC Connect
An all in one solution to connect your SoC devices, mqtt, redis, websockets

## Prerequisites
Redis [Installation Instructions](https://redis.io/topics/quickstart)
> I've included a version of Redis in the `third-party` directory, extract the gzip and run `make` after extracting it. Make sure you run `make test` to test the integrity of the application.  

Start the redis server
`$ redis-server`

Flush and clear the cache  
`$ redis-cli FLUSHALL`