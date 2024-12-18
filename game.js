// to verify game beginning 
var started = false;
var level = 0;

// game setup
var butterColours = ['red','blue', 'green', 'yellow'];

var userClickedPattern = [];
var gamePattern = [];


$(document).keypress(function() {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

// user input via clicks
$('.btn').on('click', function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    // $('#' + userChosenColour).fadeOut(50).fadeIn(150).fadeOut(150).fadeIn(50);
    console.log(userClickedPattern);
    /* var gameSound = new Audio('./sounds/' + userChosenColour + '.mp3');
        gameSound.play(); */
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // call checkAnswer()
    checkAnswer(userClickedPattern.length-1);
});

// sound playing tool
function playSound(name) {
    var gameSound = new Audio('./sounds/' + name + '.mp3');
        gameSound.play();
};


// game default sequence generator 
function nextSequence() {

    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    // randomChosenColour generates a string value
    var randomChosenColour = butterColours[randomNumber];
    // generates list of games played
    gamePattern.push(randomChosenColour);
    
    // animations, effects and sounds
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    /* var gameSound = new Audio('./sounds/' + randomChosenColour + '.mp3');
        gameSound.play(); */
    playSound(randomChosenColour);
    console.log(gamePattern);
};




/* function playSim () {
    randomChosenColour = butterColours[nextSequence()];
      gamePattern.push(randomChosenColour);
      return gamePattern;
  } */

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(() => {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

// running my own test 
/* $('.btn').on('click', function (event) {
    var butnCl = $(this).attr('id');
    animatePress(butnCl);
}); */

// activate game on key press
/* $(document).on('keypress', function() {
    nextSequence();
});
 */


/* function gameStart() {
    for (let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]){
            $('#title-level').text('Game Over');
            gamePattern = [];
            userClickedPattern = [];
        }
           
    }
    level++;
    $('#title-level').text('Level '+ level);
    userClickedPattern = [];
} */

function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log('success');       

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }   else { 
            console.log('wrong'); 
            
            playSound('wrong');
            $('body').addClass('game-over');

            setTimeout(function() {
               $('body').removeClass('game-over');
            }, 200); 
            $('#level-title').text('Game Over, Press Any Key to Restart');
            startOver();
        }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}