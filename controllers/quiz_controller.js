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
exports.question= function(req,res){

  res.render('quizes/question',{title:'Quiz', subtitle:'el juego de las preguntas mortales',pregunta:'¿Cuál es la capital de Italia?'});



};


exports.answer=function(req,res){
if(req.query.respuesta.match(/roma/i)){

res.render('quizes/answer',{title:'Quiz', subtitle:'el juego de las preguntas mortales',respuesta:'Respuesta correcta'});

}
else{

res.render('quizes/answer',{title:'Quiz', subtitle:'el juego de las preguntas mortales',respuesta:'Respuesta errónea'});

}



};
