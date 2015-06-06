// GET /quizes/question

exports.question= function(req,res){

res.render('question',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',pregunta:'¿Cuál es la capital de Italia?'});

};

exports.answer=function(req,res){

	if(req.query.respuesta==='Roma'){

		res.render('answer',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',respuesta:'Respuesta correcta'});
	}

	else{

		res.render('answer',{title:'Quiz',subtitle:'El juego Online con miles de preguntas',respuesta:'Respuesta incorrecta'});

	}

};