const coralBtn = document.getElementById('top-div1');
const blueBtn = document.getElementById('top-div2');
const redBtn = document.getElementById('bottom-div1');
const purpleBtn = document.getElementById('bottom-div2');
const startGame = document.getElementById('start-game-btn')


startGame.addEventListener('click', () => {
  console.log('Game Start')
})

coralBtn.addEventListener('click', () => {
  console.log('Coral')
})

blueBtn.addEventListener('click', () => {
  console.log('Blue')
})

redBtn.addEventListener('click', () => {
  console.log('red')
})

purpleBtn.addEventListener('click', () => {
  console.log('Purple')
})