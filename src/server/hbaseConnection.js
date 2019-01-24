require('dotenv').config();
const fetch = require('node-fetch');
const HEADERS = {'Accept': 'application/json'};
const TABLE = process.env.HBASE_TABLE;

class HBaseRequests {
    constructor(postName, port) {
	this.url = 'http://localhost:' + port;
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
