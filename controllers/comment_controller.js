var models = require('../models/models.js');


exports.load = function (req,res,next,commentId){

 models.Comment.find({where:{id:(commentId)}}).then(
      function(comment){

        if(comment){
          req.comment = comment;
          next();
        }

        else{var err= new Error('No existe commentId='+ commentId);next(err);}


      }
    ).catch(function(err){next(err);})




}


exports.new = function(req,res){

	res.render('comments/new.ejs',{quizId: req.params.quizId});


};

exports.show = function(req,res){


res.render('comments/show',{comment:req.comment});



}


exports.shownonverified = function(req,res){

	 models.Comment.findAll({where:{publicado:false}}).then(function(comments){

	 	res.render('comments/nonverified.ejs', {comments:comments});



	 })




}



exports.publishAll = function(req,res){
var i;

 models.Comment.findAll({where:{publicado:false}}).then(function(comments){

 	if(comments.length){

	 	for (i=0; i<comments.length; i++){

	 		comments[i].publicado= true;

	 		comments[i].save( {fields:["publicado"]} );

	 		

	 	}
	 }else{res.redirect('/comments/')}
	 res.redirect('/comments/');

	 })


}



exports.publish = function(req,res){


req.comment.publicado = true;

req.comment.save( {fields:["publicado"]}).then(function(){res.redirect('/comments/')});






}




exports.create = function(req,res){


	var comment = models.Comment.build({texto: req.body.comment.texto, publicado: false, QuizId: req.params.quizId});

	comment.validate()
		.then(
			function(err){
				if(err){
						res.render('comments/new.ejs',{comment:comment, errors: err.errors});

				}else{ comment.save().then( function(){ res.redirect('/quizes/'+req.params.quizId)})}




			}

		)



};
