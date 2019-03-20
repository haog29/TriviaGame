
//Array For Trvia Questions, choices, and :
// render questions
var koyaGuessGame = 
[{
	question: "Who Made Koya?",
	choiceList: ["Jin", "V", "Yoongi", "Namjoon"],
	pick: 3
},{
	question: "What Animal do you think Koya is?",
	choiceList: ["Monkey", "Elephant", "Rabbit", "Koala"],
	pick: 3
},{
	question: "Which character is a Pink Rabbit?",
	choiceList: ["Cooky", "Chimmy", "Shooky", "RJ"],
	pick: 0
},{
	question: "Which character did yoonGi made?",
	choiceList: ["Van", "Chimmy", "Shooky", "Tata"],
	pick: 2
},{
	question: "Who Created Rj?",
	choiceList: ["V", "Jin", "JungKook", "Jimin"],
	pick: 1
},{
	question: "Which character loves to sleep?",
	choiceList: ["koya", "Chimmy", "Tata", "Mang"],
	pick: 0
},{
	question: "Which Messaging app is BT21 made for?",
	choiceList: ["Messenger", "KakaoTalk", "WeChat", "LineFriends"],
	pick: 3
},{
	question: "Who does character Van represents?",
	choiceList: ["blinks", "voodoo doll", "Ahgase", "Army"],
	pick: 3
},{
	question: "Who made character Mang?",
	choiceList: ["V", "Hobi", "Namjoon", "Jimin"],
	pick: 1
},{
	question: "Which character hates milk?",
	choiceList: ["Chimmy", "Shooky", "cooky", "TTata"],
	pick: 1
}];

var curQuest, 
correctAnswer, 
notAns, 
unanswered,
 seconds,
  time, 
  answered, 
  userSelect;

//alert messages
var alertMes = {
	correct: "That's Correct",
	incorrect: "OOOPPS! Try Again!",
	endTime: "time's up!!",
	done: "Let's See how you did! "
}


$('#startBtn').on('click', function(){
    $(this).hide();
	startNewG();
});


$('#startAgain').on('click', function(){
	$(this).hide();
	startNewG();
});

function startNewG(){
    
	$('#finMes').empty();
	$('#rightAnswers').empty();
	$('#notAnss').empty();
    $('#unGuessed').empty();
   
	curQuest = 0;
	correctAnswer = 0;
	notAns = 0;
	unGuessed = 0;
	nextQuest();
}


function nextQuest(){
   
	$('#message').empty();
	$('#realAnswer').empty();
	
	answered = true;
	$('.trivias').html( koyaGuessGame[curQuest].question );
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(koyaGuessGame[curQuest].choiceList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.choiceList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeCount').html('Countdown: ' + seconds);
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeCount').html('Countdown: ' + seconds );
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// modify the question object to have value for whether they answered right or wrong

function answerPage(){
    
	$('#curQuest').empty();
	$('.thisChoice').empty();
	$('.trivia').empty();
// iterate over questions, count up isCorrect
	var rightAnswerText = koyaGuessGame[curQuest].choiceList[koyaGuessGame[curQuest].pick];
	var rightAnswerIndex = koyaGuessGame[curQuest].pick;

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        alert(alertMes.correct);
        $('#realAnswer').html('You Guessed it Right its : ' + rightAnswerText);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		notAns++;
		alert(alertMes.incorrect);
		$('#realAnswer').html('The Right Guess was: ' + rightAnswerText);
	} else{
		unGuessed++;
		alert(alertMes.endTime);
		$('#realAnswer').html('The Right Guess was: ' + rightAnswerText);
		answered = true;
	}
	
	if(curQuest == (koyaGuessGame.length-1)){
		setTimeout(viewScore, 1000)
	} else{
		curQuest++;
		setTimeout(nextQuest, 1000);
	}	
}

// whenever finish game button is clicked OR the timer runs out
function viewScore(){
	$('#timeCount').empty();
	$('#message').empty();
	$('#realAnswer').empty();
	$('#finMes').html(alertMes.done);
	$('#rightAnswers').html("Right Guess: " + correctAnswer);
	$('#notAnss').html("Wrong Guess: " + notAns);
	$('#unGuessed').html("Didn't Get to Guess: " + notAns);
	$('#startAgain').addClass('reset');
	$('#startAgain').show();
	$('#startAgain').html('Play again')}