var express = require("express");
var path = require("path");
var formidable = require("formidable");
var app = express();

var index_page = "<!DOCTYPE html><html lang='en-US'><head><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'></head><body>" + 
				"<form action='/upload' method='post' enctype='multipart/form-data'>" +
				"<input type='file' name='upload-file' style='width=100%;height=250px'>" +
				"<input type='submit' value='Upload'>" +
				"</form></body></html>";

app.use("/uploads", express.static("uploads") );

app.get("/", function(req, res){
	res.send(index_page);
});

app.post("/upload",function(req, res){
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/uploads";
	form.keepExtensions = true;

	form.parse(req, function(err, items, files){
		res.writeHead(200, {"Content-Type": "text/html"});
		var fileName = path.parse(files["upload-file"].path);
		console.log("/uploads/" + fileName.base);

		res.end("File uploaded!<br /><video controls src='//localhost:8000" + ("/uploads/" + fileName.base) + "'></video><br /><a href='/'>Back</a>");
	});
});

app.listen(8000);