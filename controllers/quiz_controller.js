// GET /quizes/question

exports.question= function(req,res){

res.render('quizes/question',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',pregunta:'¿Cuál es la capital de Italia?'});

};

exports.answer=function(req,res){

	if(req.query.respuesta.match(/roma/i)){

		res.render('quizes/answer',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',respuesta:'Respuesta correcta'});
	}

	else{

		res.render('quizes/answer',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',respuesta:'Respuesta incorrecta'});

	}

};