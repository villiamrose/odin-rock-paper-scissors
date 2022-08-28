class Game {
  constructor() {
    this._playerScore = 0;
    this._computerScore = 0;
    this._round = 1;
  }

  getPlayerScore() {
    return this._playerScore;
  }

  addPlayerScore() {
    console.log(`player score added`);
    this._playerScore++;
    return this._playerScore;
  }

  getComputerScore() {
    return this._computerScore;
  }

  addComputerScore() {
    console.log(`computer score added`);
    this._computerScore++;
    return this._computerScore;
  }

  getRound() {
    return this._round;
  }

  nextRound() {
    this._round++;
    return this._round;
  }

  handleEvent(e) {
    if (e.type === 'click') {
      setSelectedButton(e.target);
      if(confirmSelection()) {
        playRound(this);
      }
    };
  }
}

// return list of available actions
function getActions () {
  const actions = [`rock`, `paper`, `gun`];
  return actions;
}

// return a random value between 0 and the given maxValue
function getRandomNumber(maxValue) {
  const minValue = 0;
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

// randomly choose between current available actions
// this serves as the selection of the computer
function getComputerAction() {
  const actions = getActions();
  const index = getRandomNumber(actions.length - 1);
  console.log(`Computer picks ${actions[index]}`);
  return actions[index];
}

// return the weakness of the given action
function getWeakness(action) {
  let weakness = ``; 

  switch(action) {
    case `rock`:
      weakness = `paper`;
      break;
    case `paper`:
      weakness =  `gun`;
      break;
    case `gun`:
      weakness = `rock`;
      break;
  }

  return weakness;
}

//display the result of the game based on the scores
function displayGameResult(playerScore, computerScore) {
  if(playerScore === computerScore) {
    console.log(`It's a draw!`);
  } else if (playerScore > computerScore) {
    console.log(`You won!`);
  } else {
    console.log(`You lost!`);
  }

  console.log(`Player score: ${playerScore}`);
  console.log(`Computer score: ${computerScore}`);
}

// display the result of the round
function displayRoundResult(playerAction, computerAction, result) {
  if(result === 1) {
    console.log(`You win! ${playerAction.toUpperCase()} beats ${computerAction.toUpperCase()}`);
  } else if (result === -1) {
    console.log(`You lose! ${computerAction.toUpperCase()} beats ${playerAction.toUpperCase()}`);
  } else {
    console.log(`Draw! You both chose ${playerAction.toUpperCase()}.`);
  }
}

// prompts selection confirmation, returns answer
function confirmSelection() {
  const selectedButton = document.querySelector('button.selected');
  return confirm(`Use ${selectedButton.textContent}?`);
}

// sets given button as selected
function setSelectedButton(button) {
  const selectedButton = document.querySelector('button.selected');
  if(selectedButton) selectedButton.classList.remove('selected');

  button.classList.add('selected');
}

// returns selected action
function getPlayerAction() {
  const selectedButton = document.querySelector('button.selected')
  const targetId = selectedButton.id;
  const action = targetId.split('_')[1];

  return action;
}

// returns result of player and computer action 
function getRoundResult(playerAction, computerAction) {
  if (playerAction === computerAction) {
    return 0;
  } else if (getWeakness(playerAction) === computerAction) {
    return -1;
  } else {
    return 1;
  }
}

// declare the winner between the given selections
function playRound(game) {
  console.log(`Round ${game.getRound()}`);

  const playerAction = getPlayerAction(); 
  const computerAction = getComputerAction();
  const result = getRoundResult(playerAction, computerAction);

  displayRoundResult(playerAction, computerAction, result);

  if(result == 1) {
    game.addPlayerScore();
  } else if (result == -1) {
    game.addComputerScore();
  }
  game.nextRound();

  console.log(game.getPlayerScore());
  console.log(game.getComputerScore());
}

//starts a new game
function newGame() {
  let game = new Game();

  const actionButtons = document.querySelectorAll('.actions button');
  actionButtons.forEach(button => button.addEventListener('click', game))
}

newGame();