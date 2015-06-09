var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',subtitle:'El portal para responder a miles de preguntas' });
});


router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/quizes/authors', function(req,res){

	res.render('authors',{nombre:'Miguel' , apellido:'del Barrio'})



});

router.get('/*', function(req,res){

	res.send("Página no encontrada");



});

/*router.get('/quiz/answer', function(req, res) {
  res.render('answer', { title: 'Quiz',subtitle:'Capital de Italia' });
});*/


module.exports = router;
