const express = require('express');
const app = express();
const cors = require('cors');
const asyncHandler = require('./asyncHandler');

function checkPort(port, portName) {
    if (isNaN(port) || port < 1024 || port > 65536) {
	throw new Error('ERROR ! Invalid' + portName +
		' option value : must be a number between 1024 and 65536');
    }
}

let hbasePort = '8080';
let apiPort = '4040';
let postName = null;

opt = require('node-getopt').create([
    ['p', 'port=ARG', 'Port for the API'],
    ['h', 'hbase=ARG', 'Port for the hbase rest API'],
    ['n', 'postName=ARG', 'Name of the post where the API rest is started']
]).bindHelp().parseSystem();

if (opt.options.postName !== undefined) {
    postName = opt.options.postName;
}
if (opt.options.port !== undefined) {
    checkPort(opt.options.port);
    apiPort = opt.options.port;
}
if (opt.options.hbase !== undefined) {
    checkPort(opt.options.hbase);
    hbasePort = opt.options.hbase;
}

if (postName === null) {
    throw new Error('Please enter a post name : option -n or --postName');
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

