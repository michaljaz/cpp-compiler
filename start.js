var express = require('express');
var path = require('path');
var app = express();
var opn = require('opn');
const { exec } = require("child_process");
fs = require('fs');

var port=3000
// app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + "/views"));
// app.set('view engine', 'html');
app.get('/compile', function(req, res){
	fs.writeFile('cpp/script.cpp', req.query.script,function (callback){
		// console.log(callback)
	});
	fs.writeFile('cpp/input.txt', req.query.input,function (callback){
		// console.log(callback)
	});
	exec("g++ cpp/script.cpp -o cpp/result", (error, stdout, stderr) => {
	    if (error) {
	        console.log(`EC: ${error.message}`);
	        res.json({type:"error",out:error.message})
	        return;
	    }
	    if (stderr) {
	        console.log(`SC: ${stderr}`);
	        return;
	    }
	    console.log(`stdout: ${stdout}`);
	    exec("./cpp/result < cpp/input.txt > cpp/output.txt", (error, stdout, stderr) => {
		    if (error) {
		        console.log(`ER: ${error.message}`);
		        return;
		    }
		    if (stderr) {
		        console.log(`SR: ${stderr}`);
		        return;
		    }
		    console.log(`stdout: ${stdout}`);
		    fs.readFile('cpp/output.txt', (err, data) => {
			  if (err) throw err;
			  res.json({type:"success",out:String(data)})
			});
		});
	});

	
	console.log(req.query.script,req.query.input)
	
	
})
app.listen(port, function (){
	opn(`http://localhost:${port}/`)
})