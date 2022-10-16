let rs = (require('stream').Readable)()
let c = 0;

console.log("There are over 100000000000000 char codes in Node! These are just a few")

rs._read = () => {
    let count = c-2;
    count>0 && console.log("  ",count);
    rs.push(String.fromCharCode(c++));

    if (c > 'z'.charCodeAt(0) +2) {
        rs.push(null);
    }

};
rs.pipe(process.stdout);