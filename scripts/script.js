class Screen {
  static #mainScreen = document.querySelector('.main');
  static #currentLog = document.querySelector('.log .current');
  static #previousLog = document.querySelector('.log .previous');
  static #actionButtons = document.querySelectorAll('.actions button');
  static #heroHpTotal = document.querySelector('.hero .hp .total');
  static #heroHpCurrent = document.querySelector('.hero .hp .current');
  static #enemyHpTotal = document.querySelector('.enemy .hp .total');
  static #enemyHpCurrent = document.querySelector('.enemy .hp .current');
  static #enemyName = document.querySelector('.enemy .name');
  static #enemy = document.querySelector('.enemy');
  
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

  static setEnemy(name, fileName) {
    const img = document.createElement('img');    
    img.setAttribute('src', `./res/characters/${fileName}.png`);

    this.#enemy.appendChild(img);
    this.#enemyName.textContent = name;
    
    Screen.log(`A ${name} appears!`);
  }

  static setHeroHpCurrent(hp) {
    this.#heroHpCurrent.textContent = hp;
  }

  static setEnemyHpCurrent(hp) {
    this.#enemyHpCurrent.textContent = hp;
  }

  static setHeroHpTotal(hp) {
    this.#heroHpTotal.textContent = hp;
  }

  static setEnemyHpTotal(hp) {
    this.#enemyHpTotal.textContent = hp;
  }
}

class Game {
  static MAX_ROUNDS = 5;
  #round = 0;
  #enemyHp = 0;
  #heroHp = 0;
  #enemy = [];

  constructor() {
    this.#round = 1;
    this.#heroHp = 5;
    this.#enemyHp = 5;
    this.#enemy = this.#createEnemy();
    
    Screen.setBackground();
    Screen.setEnemyHpCurrent(this.#enemyHp);
    Screen.setEnemyHpTotal(this.#enemyHp);
    Screen.setHeroHpCurrent(this.#heroHp);
    Screen.setHeroHpTotal(this.#heroHp);
    Screen.setEnemy(this.#enemy.name, this.#enemy.fileName);
  }

  #createEnemy() {
    const ENEMIES = [
      {name: 'Alien', fileName: 'chr_aln'},
      {name: 'Apple', fileName: 'chr_apl'},
      {name: 'Bunny Kid', fileName: 'chr_bny'},
      {name: 'Doctor', fileName: 'chr_dct'},
      {name: 'Dragonfly', fileName: 'chr_drg'},
      {name: 'Egg', fileName: 'chr_egg'},
      {name: 'Elephant', fileName: 'chr_elp'},
      {name: 'Eggplant', fileName: 'chr_epl'},
      {name: 'Hunter', fileName: 'chr_htr'},
      {name: 'Money', fileName: 'chr_mny'},
      {name: 'Ninja', fileName: 'chr_nnj'},
      {name: 'Nerd', fileName: 'chr_nrd'},
      {name: 'Old Man', fileName: 'chr_old'},
      {name: 'Photographer', fileName: 'chr_pht'},
      {name: 'Racoon', fileName: 'chr_rcn'},
      {name: 'Skeleton', fileName: 'chr_skl'},
      {name: 'Square', fileName: 'chr_sqr'},
      {name: 'Unicorn', fileName: 'chr_ucn'},
      {name: 'Watermelon', fileName: 'chr_wml'}
    ];
    const DESCRIPTIONS = [
      'Lazy',
      'Homeless',
      'Dirty',
      'Naughty',
      'Rabid',
      'Sneaky',
      'Rotund',
      'Crazy',
      'Nosy',
      'Regular',
      'Curious',
      'Shy',
      'Geeky',
      'Skinny',
      'Sleepy',
      'Crummy',
      'Suspicious',
      'Dank',
      'Drunk',
      'Militant',
      'Sleazy'
    ];
    const enemy = ENEMIES[getRandomNumber(ENEMIES.length - 1)];
    const description = DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length - 1)];

    enemy.name = `${description} ${enemy.name}`;
    
    return enemy;
  }

  getHeroHp() {
    return this.#heroHp;
  }

  getEnemyHp() {
    return this.#enemyHp;
  }

  decreaseHeroHp() {
    if(this.#heroHp !== 0) {
      --this.#heroHp;
    }

    Screen.setHeroHpCurrent(this.#heroHp);

    return this.#heroHp;
  }

  decreaseEnemyHp() {
    if (this.#enemyHp !== 0) {
      --this.#enemyHp;
    }

    Screen.setEnemyHpCurrent(this.#enemyHp);

    return this.#enemyHp;
  }

  getRound() {
    return this.#round;
  }

  displayResult() {
    if (this.#heroHp > this.#enemyHp) {
      Screen.log(`The enemy has been defeated. You won the game!`);
    } else {
      Screen.log(`You have been beaten by the enemy. You lost the game!`);
    }
    Screen.log(`Game over!`);
  }

  nextRound() {
    if (this.#heroHp == 0 || this.#enemyHp == 0) {
      this.displayResult();
      resetGame(this);
    } else {
      this.#round++;
    };
    return this.#round;
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
  
  round.displayResult();
  
  const roundResult = round.getResult();

  if(roundResult == 1) {
    game.decreaseEnemyHp();
  } else if (roundResult == -1) {
    game.decreaseHeroHp();
  }

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