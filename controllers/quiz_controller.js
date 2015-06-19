var models = require('../models/models.js');

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

exports.load = function(req,res,next,quizId){

  models.Quiz.find(quizId).then(
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



exports.update = function(req,res){

req.quiz.pregunta = req.body.quiz.pregunta;
req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz.validate().then(function(err){ 
    if (err){ 
      res.render('quizes/new',{quiz:req.quiz, errors:err.errors});
    } 
   else{  
    req.quiz.save({fields:['pregunta','respuesta']}).then(function(){res.redirect('/quizes')});  

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
    quiz.save({fields:['pregunta','respuesta']}).then(function(){res.redirect('/quizes')});  

    }    

  });

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
