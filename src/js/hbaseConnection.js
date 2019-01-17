const fetch = require('node-fetch');

const HEADERS = 'Accept: text/xml';
const URL = 'http://young:9090/';
const SCHEMA = '/schema';

async function getTableSchema (table) {
	const tables = URL + table + SCHEMA;
	return fetch(tables, {
				method: 'GET',
				headers: {HEADERS}
			}).then(res => {
				return res.text();
			}).catch(err => {
				return err.message;
			});
}
