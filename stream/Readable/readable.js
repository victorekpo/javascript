var Readable = require('stream').Readable;

var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push('another 1');
//rs.push(null); // signals end of stream

rs.pipe(process.stdout); // sends to another stream, in this case stdout
rs.push('another 2');
rs.push(null);

rs = new Readable;
rs.pipe(process.stdout); 
rs.push('beep2 ');
rs.push('boop2\n');
rs.push('another 3');
rs.push(null);