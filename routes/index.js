	var express = require('express');
	var router = express.Router();
	var mongo = require('mongo');
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost/userdata';
	var cookieParser = require('cookie-parser');
	var session  = require('express-session');
	var bodyParser = require('body-parser');
	var multer = require('multer');
	var upload = multer(); 
	var connectionString = "mongodb+srv://Admin:admin@cluster0-fn1pl.mongodb.net/test";

	router.use(cookieParser());
	router.use(session({secret: "Shh, its a secret!"}));
	router.use(upload.array());
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: true })); 

/*	mongo.connect('mongodb://localhost/userdata');
	/* GET home page. 

	var userSchema = mongo.Schema({
		userId: String,
		password: String,
		photos:[]
	});

	var User = mongo.model("User",userSchema);
*/

	function isEmpty(obj) {
	  return !Object.keys(obj).length;
	}



	router.get('/', function(req, res){
	   if(req.session.page_views){
	      req.session.page_views++;
	      res.send("You visited this page " + req.session.page_views + " times");
	   } else {
	      req.session.page_views = 1;
	      res.send("Welcome to this page for the first time!");
	   }
	});



	router.post('/', function(req, res,next){
	   res.send("Success");
	});


	router.get('/register', function(req, res, next) {
	  res.send("register page");
	});

	router.post('/test', function(req, res, next) {
	MongoClient.connect(url,function(err,db){
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.createCollection("customers", function(err,res){
		if(err) throw err;
		console.log("collection created!");
		db.close();
	});
});
	});


router.post('/register/submit', function(req, res, next) {
	  MongoClient.connect(connectionString,function(err,db){
	  var dbo = db.db("users");
	  if (!req.body.userId || !req.body.password){
	  res.status("400");
	  res.send("Please fill userid or password");	
	  }else{
	  	var existed = false;
		dbo.collection("usersData").findOne({userId: req.body.userId}, function(err,result){
			if (err) throw err;
			if (result !== null){
			res.send("The username already existed");
			}else{
				dbo.collection("users").insertOne(req.body,function(err,resp){
					if (err) throw err;
					else res.send("Success");
				});
		}
		});
	  }
	});
});

	router.get('/login', function(req, res, next) {
	  res.send("register page");
	});

	router.post('/login/submit', function(req, res, next) {
	  res.send("register page");
	});

	router.get('/contact', function(req, res, next) {
	  res.send("register page");
	});



	module.exports = router;