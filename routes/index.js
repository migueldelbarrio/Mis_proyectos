var express = require('express');
var router = express.Router();

var quizController= require('../controllers/quiz_controller');
var commentController= require('../controllers/comment_controller');
var sessionController= require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',subtitle:'El portal para responder a miles de preguntas' });
});


//RUTAS DE SESIÓN
router.get('/users', sessionController.index);
router.get('/login', sessionController.new);
router.post('/login',sessionController.create)
router.get('/logout', sessionController.destroy);
//router.post('/login', sessionController.create);
//router.get('/logout', sessionController.destroy);


//RUTAS DE QUIZES
router.param('quizId', quizController.load);


router.get('/folders',sessionController.loginRequired,sessionController.timeoutlogin,quizController.showfolders);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired,sessionController.timeoutlogin, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.delete('/quizes/:quizId', sessionController.loginRequired,sessionController.timeoutlogin, quizController.delete);

router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired,sessionController.timeoutlogin, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired,sessionController.timeoutlogin, quizController.update);
/*router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);*/

//RUTAS DE COMENTARIOS

router.param('commentId', commentController.load);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.get('/comments/', commentController.shownonverified);
router.get('/comments/:commentId(\\d+)', commentController.show);
router.post('/quizes/:quizId(\\d+)/comments/',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired,sessionController.timeoutlogin, commentController.publish);
router.get('/comments/publishall', commentController.publishAll);


router.get('/quizes/authors', function(req,res){


res.render('authors',{nombre:'Miguel' , apellido:'del Barrio'})



});

router.get('/*', function(req,res){

	res.send("Error 404: Página no encontrada");



}); 

/*router.get('/quiz/answer', function(req, res) {
  res.render('answer', { title: 'Quiz',subtitle:'Capital de Italia' });
});*/


module.exports = router;
