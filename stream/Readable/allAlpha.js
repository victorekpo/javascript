let rs = (require('stream').Readable)()
let c = 65 - 1;

//console.log("There are over 100000000000000 char codes in Node! These are just a few")

rs._read = () => {
    if (c >= 'z'.charCodeAt(0)) {
        rs.push(null);
    }
    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};
rs.pipe(process.stdout);

process.on('exit', function () {
    console.error('\n_read() called ' + (c - 65) + ' times');
});
process.stdout.on('error', process.exit);