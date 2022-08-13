// return list of available actions
function getActions () {
  const actions = [`rock`, `paper`, `gun`];
  return actions;
}

// randomly choose between current available actions
// this serves as the selection of the computer
function getComputerChoice() {
  const actions = getActions();
  const index = getRandomNumber(actions.length - 1);
  console.log(`Computer picks ${actions[index]}`);
  return actions[index];
}

// return a random value between 0 and the given maxValue
function getRandomNumber(maxValue) {
  const minValue = 0;
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}