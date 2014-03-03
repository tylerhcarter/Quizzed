window.Quizzed = (function( $ ){
	var obj = {};
	var score = {};
	var counter = 0;
	var questions = [];
	var types = {};
	var typeArr = [];

	obj.init = function( args ){

		data = args;
		questions = args.questions;
		types = args.types;

		obj.findTeams();
		obj.draw( counter );
	}

	obj.findTeams = function(){

		var qCount = questions.length;
		for( var i = 0; i < qCount; i++ ){
			var answers = questions[i].answers;
			var aCount = answers.length;
			for( var t = 0; t < aCount; t++ ){
				var types = answers[t].type;
				if( typeof types == 'string' ){
					types = [ types ];
				}

				var tCount = types.length;
				for( var m = 0; m < tCount; m++ ){
					if( typeof score[types[m] ] == 'undefined' ){
						score[ types[m] ] = 0;
						typeArr.push( types[m] );
					}
				}
			}
		}

	}

	obj.clickHandler = function(){

		var type = $(this).data( 'type' );

		if( type.indexOf(',') ){
			type = type.split(',');
		}else{
			type = [ type ];
		}

		var count = type.length;
		for( var i = 0; i < count; i++ ){
			score[ type[i] ] = score[ type[i] ] + 1;
		}

		counter = counter + 1;
		if( counter == questions.length ){
			obj.finishGame();
		}else{
			obj.draw( counter );
		}

	}

	obj.draw = function( number ){
		var main = $("#quizzed");
		main.html("");
	
		var question = questions[ number ].question;
		var answers = questions[ number ].answers;

		$( '<div/>', {
			'class' : 'question',
			'text' : question
		}).appendTo(main);

		answers = shuffleArray( answers );
		var count = answers.length;
		for( var i = 0; i < count; i++ ){
			var item = answers[i];
			$( '<div/>', {
				'class' : 'answer',
				'data-type' : item.type,
				'html' : item.text,
				'click' : obj.clickHandler,
			}).appendTo(main);
		}

	}

	obj.finishGame = function(){

		var main = $("#quizzed");
		main.html("");

		names = shuffleArray( typeArr );
		var topScore = 0;
		var winner = '';
		var count = names.length;
		for( var i = 0; i < count; i++ ){
			var number = score[ names[i] ];
			console.log( number );
			if( number > topScore ){
				topScore = number;
				winner = names[i];
			}
		}

		var winner = types[winner];

		$( '<img/>', {
			'class' : 'winner-img',
			'src' : winner.img,
		} ).appendTo(main);

		$( '<div/>', {
			'class' : 'winner-introduction',
			'html' : 'You are most similar to...',
		} ).appendTo(main);

		$( '<div/>', {
			'class' : 'winner',
			'html' : winner.name,
		} ).appendTo(main);

		$( '<div/>', {
			'class' : 'winner-desc',
			'html' : winner.desc,
		} ).appendTo(main);

	}

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	return obj;
})(jQuery);
