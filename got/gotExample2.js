//const { got } = await import('got');
import got from 'got';

let resultGet = null;
let resultPost = null;

const fetchData = async () => {
	const data = await got.get('http://jsonplaceholder.typicode.com/todos').json();
	console.log(data);
	return resultGet = data;
}

const postData = async () => {
	const { data } = await got.post('http://httpbin.org/anything', {
		json: {
			hello: 'world'
		}
	}).json();
	console.log(data);
	return resultPost = data;
}

fetchData();
postData();
