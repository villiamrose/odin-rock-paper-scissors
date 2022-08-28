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

// declare the winner between the given selections
function playRound(playerSelection, computerSelection) {
  const pSelect = playerSelection.toLowerCase(); 
  const cSelect = computerSelection.toLowerCase();

  if (pSelect === cSelect) {
    return 0;
  } else if (getWeakness(pSelect) === cSelect) {
    return -1;
  } else {
    return 1;
  }
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

//prompts for and validates user action
function promptAction() {
  const validActions = getActions();
  let playerAction = ``; 
  let keepGoing = true;
  
  while(keepGoing) {
    playerAction = prompt(`Enter your action`, ``);

    if(playerAction === null || validActions.indexOf(playerAction.toLowerCase()) > -1) {
      keepGoing = false;
    } else {
      console.log(`Try again, valid actions are: ${validActions.toString()}`);
    }
  }

  return playerAction;
}

class Game {
  constructor() {
    this._playerScore = 0;
    this._computerScore = 0;
    this._round = 0;
  }

  getPlayerScore() {
    return this._playerScore;
  }

  addPlayerScore() {
    this._playerScore++;
    return this._playerScore;
  }

  getComputerScore() {
    this._computerScore++;
  }

  addComputerScore() {
    this._computerScore++;
    return this._computerScore;
  }

  getRound() {
    this._round;
  }

  nextRound() {
    this._round++;
    return this._round;
  }

  handleEvent(e) {
    if (e.type === 'click') setSelected(e.target);
  }
}

function setSelected(button) {
  const selectedButton = document.querySelector('button.selected');
  if(selectedButton) selectedButton.classList.remove('selected');

  button.classList.add('selected');
}

//main function
function main() {
  let game = new Game();

  const actionButtons = document.querySelectorAll('.actions button');
  actionButtons.forEach(button => button.addEventListener('click', game))
}

main();