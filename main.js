var express = require("express");
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var app = express();

/* 
	Simple Template
*/

app.engine("view", function(path, opt, callback){
	fs.readFile(path, function(err, content){
		if(err) return callback(err);
		var rendered = content.toString().replace(/\#src\#/g, opt.src);
    	return callback(null, rendered);
	});
});
app.set("views", __dirname + "/views");
app.set("view engine", "view");

app.use("/uploads", express.static("uploads") );

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");

});

app.post("/upload",function(req, res){
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/uploads";
	form.keepExtensions = true;

	form.parse(req, function(err, items, files){
		var fileName = path.parse(files["upload-file"].path);
		res.render("upload",{src: ("/uploads/" + fileName.base) });
	});
});

app.listen(8000);