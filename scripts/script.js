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
function getComputerChoice() {
  const actions = getActions();
  const index = getRandomNumber(actions.length - 1);
  console.log(`Computer picks ${actions[index]}`);
  return actions[index];
}

// return the weakness of the given action
function getWeakness(action) {
  let weakness = undefined; 

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
    default:
      weakness = ``;  
  }

  return weakness;
}

// declare the winner between the given selections
function playRound(playerSelection, computerSelection) {
  const pSelect = playerSelection.toLowerCase(); 
  const cSelect = computerSelection.toLowerCase();

  if (pSelect === cSelect) {
    return `Draw! You both chose ${pSelect.toUpperCase()}.`
  } else if (getWeakness(pSelect) === cSelect) {
    return `You lose! ${cSelect.toUpperCase()} beats ${pSelect.toUpperCase()}`;
  } else {
    return `You win! ${pSelect.toUpperCase()} beats ${cSelect.toUpperCase()}`;
  }
}

const mySelection = `rock`;
console.log(playRound(mySelection, getComputerChoice()));