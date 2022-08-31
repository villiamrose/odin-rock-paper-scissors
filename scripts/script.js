class Screen {
  static #mainScreen = document.querySelector('.main');
  static #currentLog = document.querySelector('.log .current');
  static #previousLog = document.querySelector('.log .previous');
  static #actionButtons = document.querySelectorAll('.actions button');
  
  static #isLogging = false;
  static #logQueue = [];
  
  static #startLogging() {
    this.#isLogging = true;
    
    const interval = 50;
    let timeout = 0;
    let logText = `${this.#logQueue[0]}...`;
    let textArray = logText.split('');

    textArray.forEach((letter, index) => {
      setTimeout(() => {
        this.#currentLog.innerHTML += letter;
        
        if(index == textArray.length - 1) {
          this.#logQueue.shift();

          this.#previousLog.innerHTML = `${logText} <br/> ${this.#previousLog.innerHTML}`;
          this.#currentLog.innerHTML = ``;
          
          if (this.#logQueue.length) {
            this.#startLogging();
          } else {
            this.#isLogging = false;
          }
        }
      }, timeout += interval);
    });
  }

  static log(text) {
    this.#logQueue.push(text);
    if(!this.isLogging()) this.#startLogging();
  }

  static isLogging() {
    return this.#isLogging;
  }

  static clearLog() {
    this.#previousLog.innerHTML = "";
  }

  static getActionButtons() {
    return this.#actionButtons;
  }

  static getSelectedButton() {
    return document.querySelector('button.selected');
  }

  static setSelectedButton(button) {
    const selectedButton = this.getSelectedButton();
    if(selectedButton) selectedButton.classList.remove('selected');

    button.classList.add('selected');
  }

  static confirmSelection() {
    const selectedButton = this.getSelectedButton();
    return confirm(`Use ${selectedButton.textContent}?`);
  }

  static setBackground() {
    const NUMBER_OF_IMAGES = 6;
    const index = getRandomNumber(NUMBER_OF_IMAGES);
    const filename = `bg${String(index).padStart(2, '0')}`;
    this.#mainScreen.style.backgroundImage = `url('./res/backgrounds/${filename}.jpg')`;
    // setAttribute('background-image', `url('./res/backgrounds/${filename}.jpg')`);
  }
}

class Game {
  static MAX_ROUNDS = 5;

  constructor() {
    Screen.setBackground();
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
    if(this._playerScore === this._computerScore) {
      Screen.log(`It's a draw!`);
    } else if (this._playerScore > this._computerScore) {
      Screen.log(`You won the game!`);
    } else {
      Screen.log(`You lost the game!`);
    }
    Screen.log(`Player score: ${this._playerScore}`);
    Screen.log(`Computer score: ${this._computerScore}`);
    Screen.log(`Game over!`);
  }

  nextRound() {
    if (this._round == Game.MAX_ROUNDS) {
      this.displayResult();
      // confirm('Play again?');
      resetGame(this);
    } else {
      this._round++;
    };
    return this._round;
  }

  handleEvent(e) {
    if(Screen.isLogging()) return;
    if (e.type === 'click') {
      Screen.setSelectedButton(e.target);
      if(Screen.confirmSelection()) {
        playRound(this);
      }
    }
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
      Screen.log(`Player wins! ${this._playerAction.toUpperCase()} beats ${this._computerAction.toUpperCase()}`);
    } else if (this.getResult() === -1) {
      Screen.log(`Computer wins! ${this._computerAction.toUpperCase()} beats ${this._playerAction.toUpperCase()}`);
    } else {
      Screen.log(`Draw! You both chose ${this._playerAction.toUpperCase()}`);
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
  Screen.log(`Computer uses ${actions[index].toUpperCase()}`);
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

// returns selected action
function getPlayerAction() {
  const selectedButton = Screen.getSelectedButton();
  const targetId = selectedButton.id;
  const action = targetId.split('_')[1];
  Screen.log(`Player uses ${action.toUpperCase()}`);
  return action;
}

// declare the winner between the given selections
function playRound(game) {
  Screen.log(`Round ${game.getRound()}`);
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
  const actionButtons = Screen.getActionButtons();
  actionButtons.forEach(button => button.removeEventListener('click', game));
  newGame();
}

//starts a new game
function newGame() {
  let game = new Game();

  const actionButtons = Screen.getActionButtons();
  actionButtons.forEach(button => button.addEventListener('click', game))
}

newGame();