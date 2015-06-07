// GET /quizes/question

exports.question= function(req,res){

res.render('quizes/question',{title:'Los cenobitas te envían una pregunta desde el infierno...',subtitle:'...acierta o muere.',pregunta:'¿Cuál es la capital de Italia?'});

};

exports.answer=function(req,res){

	if(req.query.respuesta.match(/roma/i)){

		res.render('quizes/answer',{title:'Has burlado a la muerte',subtitle:'(Recuerda, la muerte acecha..)',respuesta:'Respuesta correcta'});
	}

	else{

		res.render('quizes/answer',{title:'Has fallado la Pregunta Mortal',subtitle:'La muerte está detrás de ti, gira la cabeza para verla...',respuesta:'Respuesta incorrecta'});

	}

};