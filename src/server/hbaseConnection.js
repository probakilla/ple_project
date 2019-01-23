const fetch = require('node-fetch');

const HEADERS = {'Accept': 'application/json'};
const BASE_URL = 'http://young:';
const SCHEMA = '/schema';
const TABLE = 'pipin'

class HBaseRequests {
    constructor(postName, port) {
	this.url = 'http://' + postName + ':' + port;
    }

    async getImage(row, column) {
	let url = this.url + '/' + TABLE + '/' + row + '/' + column;
	let ret = await fetch(url, {
	    method: 'GET',
	    headers: HEADERS
	}).then(data => {
	    return data.json();
	}).then(response => {
	    return response;
	}).catch(err => {
	    console.error(err.message);
	})
	return ret;
    }
}

module.exports = HBaseRequests;
