const request = require('request')
const es = require('event-stream')

console.time('json-streamer')
const req = request({url: 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json'})

const logger = es.mapSync(function (data) {  //create a stream that logs to stderr,
    console.log(data.toString()) // convert buffer to string
    return data
})

req.pipe(logger)
console.timeEnd('json-streamer')
