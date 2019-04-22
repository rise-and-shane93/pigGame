/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, dice2, gamePlaying, pointsToWin;

var input = document.querySelector('input');

init();

document.querySelector('.btn-pointsToWin').addEventListener('click', function() {
    pointsToWin = parseInt(input.value);
    document.querySelector('.pointsToWin').setAttribute('disabled', true);
    document.querySelector('.btn-pointsToWin').setAttribute('disabled', true);
});

//0 will be the first player and 1 will be the second player



document.querySelector('.btn-roll').addEventListener('click', function() {
    if (input.value !== '') {
        if (gamePlaying) {
            //1. generate a random number
            var dice = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;
            var diceTotal = dice + dice2;
    
            //2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            var diceDOM2 = document.querySelector('.dice2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-' + dice2 + '.png';

    
            //3. Update the round score IF the rolled number was NOT a 1.
            if (diceTotal === 1 || diceTotal === 12) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else if (dice > 1) {
                //add the score
                roundScore += diceTotal;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                //next player
                nextPlayer();
            }

        }
    } else {
        alert('Please input a points to win value.');
    }
}); //end roll dice event listener

document.querySelector('.btn-hold').addEventListener('click', function() {
    /*
    var i;
    if (activePlayer === 0) {
        i = 0;
        scores[i] += roundScore;
        scoresZero += roundScore;
        roundScore = 0;
        document.getElementById('current-0').textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[i];
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        activePlayer++;
    } else {
        i = 1;
        scores[i] += roundScore;
        scoresOne += roundScore;
        roundScore = 0;
        document.getElementById('current-1').textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[i];
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        activePlayer--;
    }
    */
    //add current score to global score
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //check if the player won the game
        if (scores[activePlayer] >= pointsToWin) {
            document.getElementById('name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }    
    }
}); //end btn hold event listener 

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    diceSix = false;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.pointsToWin').value = '';
    // input.value = 'Points to Win!';
    document.querySelector('.pointsToWin').removeAttribute('disabled');
    document.querySelector('.btn-pointsToWin').removeAttribute('disabled');
}