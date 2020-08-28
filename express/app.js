const express = require("express")
const app = express()
const path = require("path")

console.log(path.extname("a.b.c.d"))

// cors跨域处理
const cors = require("cors")
app.use(cors())

//设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
// res.header('Access-Control-Allow-Origin', '*');
// res.header('Access-Control-Allow-Headers', 'Content-Type');
// res.header('Access-Control-Allow-Methods', '*');
// res.header('Content-Type', 'application/json;charset=utf-8');
// next();
// });

// 静态资源
app.use(express.static("static"))
// app.use("/static", express.static(path.join(__dirname, "static")))//这个居然有错

var bodyParser = require('body-parser')
var ueditor = require("ueditor")
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json());

// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/static/ueditor/ueditor.config.js
// 官方例子是这样的 serverUrl: URL + "php/controller.php"
// 我们要把它改成 serverUrl: URL + 'ue'
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'static'), function (req, res, next) {

	// ueditor 客户发起上传图片请求
	if (req.query.action === 'uploadimage') {

		// 这里你可以获得上传图片的信息
		var foo = req.ueditor;
		console.log(foo.filename); // exp.png
		console.log(foo.encoding); // 7bit
		console.log(foo.mimetype); // image/png

		// 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'static') 作为根路径）
		var img_url = 'yourpath';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage') {
		var dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
		res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {

		res.setHeader('Content-Type', 'application/json');
		// 这里填写 ueditor.config.json 这个文件的路径
		res.jsonp(
			{
				"imageActionName": "uploadimage",
				"imageFieldName": "upfile",
				"imageMaxSize": 2048000,
				"imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
				"imageCompressEnable": true,
				"imageCompressBorder": 1600,
				"imageInsertAlign": "none",
				"imageUrlPrefix": "http://localhost:8000/",
				"imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",

				"scrawlActionName": "uploadscrawl",
				"scrawlFieldName": "upfile",
				"scrawlPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
				"scrawlMaxSize": 2048000,
				"scrawlUrlPrefix": "/ueditor/net/",
				"scrawlInsertAlign": "none",

				"snapscreenActionName": "uploadimage",
				"snapscreenPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
				"snapscreenUrlPrefix": "/ueditor/net/",
				"snapscreenInsertAlign": "none",
				"catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
				"catcherActionName": "catchimage",
				"catcherFieldName": "source",
				"catcherPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
				"catcherUrlPrefix": "/ueditor/net/",
				"catcherMaxSize": 2048000,
				"catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],


				"videoActionName": "uploadvideo",
				"videoFieldName": "upfile",
				"videoPathFormat": "upload/video/{yyyy}{mm}{dd}/{time}{rand:6}",
				"videoUrlPrefix": "/ueditor/net/",
				"videoMaxSize": 102400000,
				"videoAllowFiles": [
					".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
					".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"],


				"fileActionName": "uploadfile",
				"fileFieldName": "upfile",
				"filePathFormat": "upload/file/{yyyy}{mm}{dd}/{time}{rand:6}",
				"fileUrlPrefix": "/ueditor/net/",
				"fileMaxSize": 51200000,
				"fileAllowFiles": [
					".png", ".jpg", ".jpeg", ".gif", ".bmp",
					".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
					".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
					".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
					".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
				],


				"imageManagerActionName": "listimage",
				"imageManagerListPath": "upload/image",
				"imageManagerListSize": 20,
				"imageManagerUrlPrefix": "/ueditor/net/",
				"imageManagerInsertAlign": "none",
				"imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],


				"fileManagerActionName": "listfile",
				"fileManagerListPath": "upload/file",
				"fileManagerUrlPrefix": "/ueditor/net/",
				"fileManagerListSize": 20,
				"fileManagerAllowFiles": [
					".png", ".jpg", ".jpeg", ".gif", ".bmp",
					".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
					".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
					".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
					".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
				]

			})
	}
}));

app.get("/", (req, res) => res.send("hello express!"))
app.listen(8000, () => console.log("express is running!"))