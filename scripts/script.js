class Game {
  static MAX_ROUNDS = 5;

  constructor() {
    this._playerScore = 0;
    this._computerScore = 0;
    this._round = 1;
  }

  getPlayerScore() {
    return this._playerScore;
  }

  addPlayerScore() {
    this._playerScore++;
    return this._playerScore;
  }

  getComputerScore() {
    return this._computerScore;
  }

  addComputerScore() {
    this._computerScore++;
    return this._computerScore;
  }

  getRound() {
    return this._round;
  }

  displayResult() {
    console.log(`Game over!`);
    if(this._playerScore === this._computerScore) {
      console.log(`It's a draw!`);
    } else if (this._playerScore > this._computerScore) {
      console.log(`You won!`);
    } else {
      console.log(`You lost!`);
    }
    console.log(`Player score: ${this._playerScore}`);
    console.log(`Computer score: ${this._computerScore}`);
  }

  nextRound() {
    if (this._round == Game.MAX_ROUNDS) {
      this.displayResult();
      confirm('Play again?');
      resetGame(this);
    } else {
      this._round++;
    };
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

class Round {
  constructor(round, playerAction, computerAction) {
    this._round = round;
    this._playerAction = playerAction,
    this._computerAction = computerAction
  }

  getRound() {
    return this._round;
  }

  getPlayerAction() {
    return this._playerAction;
  }

  getComputerAction() {
    return this._computerAction
  }

  getResult() {
    if (this._result) return this._result;
    if (this._playerAction === this._computerAction) {
      return this._result = 0;
    } else if (getWeakness(this._playerAction) === this._computerAction) {
      return this._result = -1;
    } else {
      return this._result = 1;
    }
  }

  displayResult() {
    if(this.getResult() === 1) {
      console.log(`You win! ${this._playerAction.toUpperCase()} beats ${this._computerAction.toUpperCase()}`);
    } else if (this.getResult() === -1) {
      console.log(`You lose! ${this._computerAction.toUpperCase()} beats ${this._playerAction.toUpperCase()}`);
    } else {
      console.log(`Draw! You both chose ${this._playerAction.toUpperCase()}.`);
    }
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

// declare the winner between the given selections
function playRound(game) {
  console.log(`Round ${game.getRound()}`);

  const round = new Round(
    game.getRound(),
    getPlayerAction(),
    getComputerAction()
  );
  
  const roundResult = round.getResult();
  if(roundResult == 1) {
    game.addPlayerScore();
  } else if (roundResult == -1) {
    game.addComputerScore();
  }
  
  round.displayResult();

  game.nextRound();
}

function resetGame(game) {
  const actionButtons = document.querySelectorAll('.actions button');
  actionButtons.forEach(button => button.removeEventListener('click', game));
  newGame();
}

//starts a new game
function newGame() {
  let game = new Game();

  const actionButtons = document.querySelectorAll('.actions button');
  actionButtons.forEach(button => button.addEventListener('click', game))
}

newGame();