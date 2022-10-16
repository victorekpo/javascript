var Stream = require('stream');
var assert = require('assert');

var src = new Stream();
src.readable = true;

var dest = new Stream();
dest.writable = true;
dest.write = function(data) {
    assert(data == 'test');
};

src.pipe(dest);
console.log(dest);

src.emit('data', 'test');