var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',subtitle:'El portal para responder a miles de preguntas' });
});

router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
/*router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);*/



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
