var models = require('../models/models.js');
var fs = require('fs');


// GET /quizes/question

/*exports.question = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    res.render('quizes/question', { title:'Quiz', subtitle:'el juego de las preguntas mortales',pregunta: quiz[0].pregunta});
  })
};

// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().then(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { title:'Has tenido suerte...', subtitle:'...has burlado a la muerte.',respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', {title:'Has fallado...', subtitle:'...Die!', respuesta: 'Incorrecto'});
    }
  })
};

*/

var statistics = {
      n_quizes:0,
      n_comments:0,
      commented: 0,
      no_commented: 0,
      med_comment:0
      
     };




exports.load = function(req,res,next,quizId){

  models.Quiz.find({where:{id:(quizId)}, include:[{model: models.Comment }]}).then(
      function(quiz){

        if(quiz){
          req.quiz = quiz;
          next();
        }

        else{var err= new Error('No existe quizId='+ quizId);next(err);}


      }
    ).catch(function(err){next(err);})
};

exports.edit = function(req,res){

  res.render('quizes/edit',{quiz: req.quiz});





};

exports.showfolders = function(req,res){


var files=fs.readdirSync('/');
var type=[];


  //fs.readdir('/', function (err, files) { // '/' denotes the root folder
  //if (err) throw err;


 // res.render('quizes/folders', {files:files});

for(var i=0; i<files.length;i++){

  var file = files[i];


    if(fs.lstatSync('/'+file).isDirectory()){type[i]='Folder-->'}
      else{ type[i]='File-->'}

    //fs.lstat('/'+file, function(err, stats) {

        //console.log(stats.isDirectory());
        //console.log(i);

    //}

    console.log(file);
}




res.render('quizes/folders', {files:files, type:type});




};



exports.update = function(req,res){

req.quiz.pregunta = req.body.quiz.pregunta;
req.quiz.respuesta = req.body.quiz.respuesta;
req.quiz.categoria = req.body.quiz.categoria;

  req.quiz.validate().then(function(err){ 
    if (err){ 
      res.render('quizes/new',{quiz:req.quiz, errors:err.errors});
    } 
   else{  
    req.quiz.save({fields:['pregunta','respuesta', 'categoria']}).then(function(){res.redirect('/quizes')});  

    }    

  });

};




exports.new = function(req,res){

  var quiz = models.Quiz.build({pregunta:'Pregunta', respuesta:'Respuesta'});

  res.render('quizes/new.ejs', {quiz:quiz});



};


exports.create = function(req,res){

  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(function(err){ 
    if (err){ 
      res.render('quizes/new',{quiz:quiz, errors:err.errors});
    } 
   else{  
    quiz.save({fields:['pregunta','respuesta','categoria']}).then(function(){res.redirect('/quizes')});  

    }    

  });

};

exports.delete = function(req,res){


  req.quiz.destroy().then(function(){ res.redirect('/quizes')})




};


exports.index= function(req,res){

  if(!req.query.buscar){

  models.Quiz.findAll().then(function(quizes){

    res.render('quizes/index.ejs', {quizes:quizes});


  })
}
else{

    var search = '%'+req.query.buscar+'%';
    search = search.replace(/ /g, "%");
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){

        res.render('quizes/index.ejs', {quizes:quizes});


    })

}



};


exports.show=function(req,res){

  //models.Quiz.find(req.params.quizId).then(function(quiz){

    //  res.render('quizes/show',{quiz:quiz});

 res.render('quizes/show',{quiz:req.quiz});

 // })



};

exports.answer= function(req,res){

//models.Quiz.find(req.params.quizId).then(function(quiz){

//      if (req.query.respuesta === quiz.respuesta){ res.render('quizes/answer',{quiz:quiz, respuesta:"Correcto"});}
//        else{res.render('quizes/answer',{quiz:quiz, respuesta:"Incorrecto"});}

//  })

var quiz = req.quiz;

 if (req.query.respuesta === quiz.respuesta){ res.render('quizes/answer',{quiz:quiz, respuesta:"Correcto"});}
       else{res.render('quizes/answer',{quiz:quiz, respuesta:"Incorrecto"});}



};


exports.statistics = function(req,res){

models.Comment.countCommentedQuizes().then(function(n_quizes){

statistics.commented=n_quizes;

//res.render('quizes/statistics', {n_quizes:statistics.commented});

return models.Comment.countUnpublished()


}).then( function(np_quizes){

statistics.no_commented= np_quizes;

return models.Quiz.findAll()
//res.render('quizes/statistics', {nc_quizes:statistics.no_commented,c_quizes:statistics.commented})

}).then(function(quizes){

statistics.n_quizes= quizes.length;
return models.Comment.findAll()

//res.render('quizes/statistics', {n_quizes:statistics.n_quizes,nc_quizes:statistics.no_commented,c_quizes:statistics.commented})


}).then(function(comments){

statistics.n_comments= comments.length;

statistics.med_comment = ((statistics.n_comments)/(statistics.n_quizes)).toFixed(2);

res.render('quizes/statistics', {n_comments:statistics.n_comments,n_quizes:statistics.n_quizes,nc_quizes:statistics.no_commented,c_quizes:statistics.commented,med_comment:statistics.med_comment})


})

};




/*exports.question= function(req,res){

  res.render('quizes/question',{title:'Quiz', subtitle:'el juego de las preguntas mortales',pregunta:'¿Cuál es la capital de Italia?'});



};


exports.answer=function(req,res){
if(req.query.respuesta.match(/roma/i)){

res.render('quizes/answer',{title:'Quiz', subtitle:'el juego de las preguntas mortales',respuesta:'Respuesta correcta'});

}
else{

res.render('quizes/answer',{title:'Quiz', subtitle:'el juego de las preguntas mortales',respuesta:'Respuesta errónea'});

}



};*/
