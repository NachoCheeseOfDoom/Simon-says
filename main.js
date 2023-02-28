// const coralBtn = document.getElementById('top-div1');
// const blueBtn = document.getElementById('top-div2');
// const redBtn = document.getElementById('bottom-div1');
// const purpleBtn = document.getElementById('bottom-div2');


const startGameBtn = document.getElementById('start-game-btn')
const round = document.getElementById('rounds-el');
const simonsBtns = document.getElementsByClassName('circle');

class Simon {
  constructor(simonsBtns, startGameBtn, round) {
    this.round = 0;
    this.userPosition = 0;
    this.totalRounds = 5;
    this.sequence = [];
    this.speed = 1000;
    this.blockedButtons = true;
    this.buttons = Array.from(simonsBtns);
    this.display = {
      startGameBtn,
      round
    }
    this.wonGameSound = new Audio('./sounds/conrats-clapping.mp3');
    this.errorSound = new Audio('./sounds/scary-game-over.mp3');
    this.buttonSounds = [
      new Audio('./sounds/Piano A.mp3'),
      new Audio('./sounds/Piano G.mp3'),
      new Audio('./sounds/Piano D.mp3'),
      new Audio('./sounds/Piano F.mp3')
    ];
  }

  // Inicia el Simon
  init() {
    // this.starSound = new Audio('./sounds/Start-of-this.gameLost.mp3');
    this.display.startGameBtn.onclick = () => this.startGame();
  }

  // Comienza el juego
  startGame() {
    this.display.startGameBtn.disabled = true;
    this.updateRound(0);
    this.userPosition = 0;
    this.sequence = this.createSequence();
    this.buttons.forEach((element, i) => {
      element.classList.remove('winner');
      element.onclick = () => this.buttonClick(i);
    });
    this.showSequence();
  }

  // Actualiza la ronda y el tablero
  updateRound(value) {
    this.round = value;
    this.display.round.textContent = `Round ${this.round}`;
  }

  // Crea el array aleatorio de botones
  createSequence() {
    return Array.from({ length: this.totalRounds }, () => this.getRandomColor());
  }

  // Devuelve un número al azar entre 0 y 3
  getRandomColor() {
    return Math.floor(Math.random() * 4);
  }

  // Ejecuta una función cuando se hace click en un botón
  buttonClick(value) {
    !this.blockedButtons && this.validateChosenColor(value);
  }

  // Valida si el boton que toca el usuario corresponde a al valor de la secuencia
  validateChosenColor(value) {
    if (this.sequence[this.userPosition] === value) {
      this.buttonSounds[value].play();
      if (this.round === this.userPosition) {
        this.updateRound(this.round + 1);
        this.speed /= 1.02;
        this.isGameOver();
      } else {
        this.userPosition++;
      }
    } else {
      this.gameLost();
    }
  }

  // Verifica que no haya acabado el juego
  isGameOver() {
    if (this.round === this.totalRounds) {
      this.gameWon();
    } else {
      this.userPosition = 0;
      this.showSequence();
    };
  }

  // Muestra la secuencia de botones que va a tener que tocar el usuario
  showSequence() {
    this.blockedButtons = true;
    let sequenceIndex = 0;
    let timer = setInterval(() => {
      const button = this.buttons[this.sequence[sequenceIndex]];
      this.buttonSounds[this.sequence[sequenceIndex]].play();
      this.toggleButtonStyle(button)
      setTimeout(() => this.toggleButtonStyle(button), this.speed / 20)
      sequenceIndex++;
      if (sequenceIndex > this.round) {
        this.blockedButtons = false;
        clearInterval(timer);
      }
    }, this.speed);
  }

  // Pinta los botones para cuando se está mostrando la secuencia
  toggleButtonStyle(button) {
    button.classList.toggle('active');
  }

  // Actualiza el simon cuando el jugador pierde
  gameLost() {
    this.errorSound.play();
    this.display.startGameBtn.disabled = false;
    this.blockedButtons = true;
  }

  // Muestra la animacón de triunfo y actualiza el simon cuando el jugador gana
  gameWon() {
    this.display.startGameBtn.disabled = false;
    this.blockedButtons = true;
    this.buttons.forEach(element => {
      element.classList.add('winner');
    });
    this.wonGameSound.play();
    this.updateRound('🏆');
  }

}

const simon = new Simon(simonsBtns, startGameBtn, round);
simon.init();








// startGame.addEventListener('click', () => {
//   console.log('Game Start')
// })

// coralBtn.addEventListener('click', () => {
//   console.log('Coral')
// })

// blueBtn.addEventListener('click', () => {
//   console.log('Blue')
// })

// redBtn.addEventListener('click', () => {
//   console.log('red')
// })

// purpleBtn.addEventListener('click', () => {
//   console.log('Purple')
// })