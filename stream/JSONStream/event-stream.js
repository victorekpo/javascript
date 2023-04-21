const process = require('node:process');
const es = require('event-stream');
const inspect = require('util').inspect;

    process.stdin                        //connect streams together with `pipe`
        .pipe(es.split())                  //split stream to break on newlines
        .pipe(es.map(function (data, cb) { //turn this async function into a stream
            cb(null
                , inspect(JSON.parse(data)))   //render it nicely
        }))
        .pipe(process.stdout)              // pipe it to stdout !


// https://www.npmjs.com/package/event-stream