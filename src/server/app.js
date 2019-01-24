require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const asyncHandler = require('./asyncHandler');

let hbasePort = process.env.REST_PORT || '8080';
let apiPort = process.env.API_PORT || '4040';
let postName = process.env.POST_NAME || null;

if (postName === null) {
    throw new Error('Please configure the correct .env file');
}

const HBase = require('./hbaseConnection');
const hbase = new HBase(postName, hbasePort);

app.use(cors());

app.get('/img/:row&:col', asyncHandler(async (req, res, next) => {
    const row = req.params.row;
    const col = req.params.col;
    const ret = await hbase.getImage(row, col);
    res.status(200).send(ret);
}));

app.listen(apiPort, () => {
    console.log('====== API LINSTENING ======' + '\n' +
		'API listening on port : ' + apiPort + '\n' +
		'HBase requests on port : ' + hbasePort + '\n' +
	        'Post name set to : ' + postName);
});
