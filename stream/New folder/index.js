const request = require('request')
const JSONStream = require('JSONStream')
const es = require('event-stream')

// console.time('json-streamer')

const parser = JSONStream.parse('..id') //emit parts that match this path (any element of the rows array)
    // . - matches current path
    // rows - matches { rows: .. }
    // rows.docs - matches { rows: { docs: .. } }
    // ..rows - matches [{rows: ...}]
    // ..rows.docs - matches [ { rows: { docs: ... } }]

const req = request({url: 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json'})

const logger = es.mapSync(function (data) {  //create a stream that logs to stderr,
    console.log(data)
    return data
})

req.pipe(parser)
parser.pipe(logger)

// console.timeEnd('json-streamer')
