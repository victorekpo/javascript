const request = require('request')
const JSONStream = require('JSONStream')
const es = require('event-stream')

// console.time('json-streamer')

const parser = JSONStream.parse('.') //emit parts that match this path (any element of the rows array)
    // . - matches current path
    // rows - matches { rows: .. }
    // rows.docs - matches { rows: { docs: .. } }
    // ..rows - matches [{rows: ...}]
    // ..rows.docs - matches [ { rows: { docs: ... } }]

// large files
// https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json
// https://raw.githubusercontent.com/ozlerhakan/mongodb-json-files/master/datasets/city_inspections.json - 23.2MB
// https://raw.githubusercontent.com/ozlerhakan/mongodb-json-files/master/datasets/companies.json - 74.6 MB
// https://dl.dropboxusercontent.com/s/gxbsj271j5pevec/trades.json - 232 MB

const req = request({url: 'https://dl.dropboxusercontent.com/s/gxbsj271j5pevec/trades.json'})

const logger = es.mapSync(function (data) {  //create a stream that logs to stderr,
    console.log(data)
    return data
})

req.pipe(parser)
parser.pipe(logger)

// req.pipe(logger)
// console.timeEnd('json-streamer')

// JSONPath reference
// https://goessner.net/articles/JsonPath/
//
// XPath	JSONPath	Description
// /	$	the root object/element
//     .	@	the current object/element
// /	. or []	child operator
// ..	n/a	parent operator
// //	..	recursive descent. JSONPath borrows this syntax from E4X.
// *	*	wildcard. All objects/elements regardless their names.
//     @	n/a	attribute access. JSON structures don't have attributes.
//     []	[]	subscript operator. XPath uses it to iterate over element collections and for predicates. In Javascript and JSON it is the native array operator.
// |	[,]	Union operator in XPath results in a combination of node sets. JSONPath allows alternate names or array indices as a set.
//     n/a	[start:end:step]	array slice operator borrowed from ES4.
//     []	?()	applies a filter (script) expression.
//     n/a	()	script expression, using the underlying script engine.
// ()	n/a	grouping in Xpath
//
// { "store": {
//     "book": [
//         { "category": "reference",
//             "author": "Nigel Rees",
//             "title": "Sayings of the Century",
//             "price": 8.95
//         },
//         { "category": "fiction",
//             "author": "Evelyn Waugh",
//             "title": "Sword of Honour",
//             "price": 12.99
//         },
//         { "category": "fiction",
//             "author": "Herman Melville",
//             "title": "Moby Dick",
//             "isbn": "0-553-21311-3",
//             "price": 8.99
//         },
//         { "category": "fiction",
//             "author": "J. R. R. Tolkien",
//             "title": "The Lord of the Rings",
//             "isbn": "0-395-19395-8",
//             "price": 22.99
//         }
//     ],
//         "bicycle": {
//         "color": "red",
//             "price": 19.95
//     }
// }
// }
//
// XPath	JSONPath	Result
// /store/book/author	$.store.book[*].author	the authors of all books in the store
// //author	$..author	all authors
// /store/*	$.store.*	all things in store, which are some books and a red bicycle.
// /store//price	$.store..price	the price of everything in the store.
// //book[3]	$..book[2]	the third book
// //book[last()]	$..book[(@.length-1)]
// $..book[-1:]	the last book in order.
// //book[position()<3]	$..book[0,1]
// $..book[:2]	the first two books
// //book[isbn]	$..book[?(@.isbn)]	filter all books with isbn number
// //book[price<10]	$..book[?(@.price<10)]	filter all books cheapier than 10
// //*	$..*	all Elements in XML document. All members of JSON structure.