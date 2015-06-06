var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',subtitle:'El portal para responder a miles de preguntas' });
});


router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

/*router.get('/quiz/answer', function(req, res) {
  res.render('answer', { title: 'Quiz',subtitle:'Capital de Italia' });
});*/


module.exports = router;
