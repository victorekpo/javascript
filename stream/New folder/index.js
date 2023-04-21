const request = require('request')
    , JSONStream = require('JSONStream')
    , es = require('event-stream')

const parser = JSONStream.parse('id') //emit parts that match this path (any element of the rows array)
    , req = request({url: 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json'})
    , logger = es.mapSync(function (data) {  //create a stream that logs to stderr,
    console.log(data)
    return data
})

req.pipe(parser)
parser.pipe(logger)