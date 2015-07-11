var time=0;


exports.new = function(req,res){

	//var errors = req.session.errors || {};
	//req.session.errors = {};

	//res.render('users/new',{errors:errors});

res.render('users/new');

};


/*exports.create = function(req,res){

	var login = req.body.login;
	var password = req.body.password;

	var userController.autenticar(login,password, function(error,user))






};*/



var models = require('../models/models.js');

exports.index= function(req,res){

  

  models.User.findAll().then(function(users){

    res.render('users/index', {users:users});


  })


};

exports.create= function(req,res){

	var user = req.body.user;
	var password = req.body.password;

	

	 models.User.find({where:{nombre:user,pass:password}}).then(function(users){

	 	if (!users){

	 			req.session.errors=[{"message":"Error en el login"}];
	 			res.render('users/new');

	 	}
	 	else{

	 		req.session.user = {id: users.id, username: user};

	 		res.redirect(req.session.redir.toString());
	 		//res.render('users/prueba', {pass:users.pass});

	 		time = new Date();

			time= time.getTime();

	 	}

	 	
	


	 })





};

exports.destroy = function(req,res){

delete req.session.user;
res.redirect(req.session.redir.toString());


};

exports.timeoutlogin = function(req,res,next){

var datetime = new Date();

datetime= datetime.getTime();

var dif=datetime-time;

if(dif<120000){console.log('dentro del tiempo-->'+dif);next();time = new Date();
				time= time.getTime();}
	else{console.log('fuera del tiempo-->'+dif);
			delete req.session.user;
			res.redirect(req.session.redir.toString());
}




};






exports.loginRequired = function(req,res,next){

	if(req.session.user){next();}
	else{res.redirect('/login');}



};