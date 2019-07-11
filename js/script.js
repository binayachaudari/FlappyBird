const CANVAS_WIDTH = 768,
  CANVAS_HEIGHT = window.innerHeight, //1024
  BIRD_HEIGHT = 194.625,
  BIRD_WIDTH = 50,
  BIRD_PASS_GAP = 130,
  PIPE_OFFSET = 80,
  GRAVITY = 0.2,
  PIPE_SPEED = 1.5,
  GROUND_OFFSET = 37;


document.body.style.margin = "0px";
document.body.style.padding = "0px";

const canvas = document.createElement("canvas");

let ctx = canvas.getContext("2d");

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.margin = "0 auto";
canvas.style.display = "block";
document.body.appendChild(canvas);

/**
 * [generates Random Number]
 * @param  {Number} min minimum Number
 * @param  {Number} max Maximum Number
 * @return {Number}     Random Number
 */
let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};


let birdData = {
  xPos: CANVAS_WIDTH / 2 - BIRD_WIDTH / 2 - 100,
  yPos: CANVAS_HEIGHT / 2 - BIRD_HEIGHT / 2,
};

let pipeData = {
  xPos: CANVAS_WIDTH + 50,
  yPos: 0
};

let birdInstance = new Bird(birdData);

let drawAll = () => {
  backgroundDraw();
  listOfPipes.forEach((eachPipe, index) => {
    eachPipe.draw();
  })
  birdInstance.draw();
  scoreCanvas();
  highScoreCanvas();
}

let updateAll = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  groundUpdate();
  groundCollisionDetection();
  listOfPipes.forEach((eachPipe, index) => {
    eachPipe.update();
    pipeCollisionDetection(eachPipe);
    deletePipe(eachPipe);
    updateScore(eachPipe);
  });
  birdInstance.update();
}

// let deltaTime = 0,
//   lastTime = (new Date()).getTime();

var gameInit;
let gameLoop = () => {
  gameInit = window.requestAnimationFrame(gameLoop);
  // let currentTime = (new Date()).getTime();
  // deltaTime = (currentTime - lastTime) / 1000;
  updateAll();
  drawAll();
  // lastTime = currentTime;
}


let listOfPipes;
let generatePipeInterval;

let generatePipes = () => {
  generatePipeInterval = setInterval(() => {
    let pipe = new Pipe(pipeData);
    listOfPipes.push(pipe);
  }, 2500);
}

generatePipes();

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 32) {
    birdInstance.velocity = -5;
  }
})

let pipeCollisionDetection = (pipeObject) => {
  if (birdInstance.x < pipeObject.x + pipeObject.width &&
    birdInstance.x + spriteWidth > pipeObject.x &&
    birdInstance.y < pipeObject.y + pipeObject.pipeHeight &&
    birdInstance.y + singleSpriteHeight > pipeObject.y) {
    gameStop();
  }

  if (birdInstance.x < pipeObject.x + pipeObject.width &&
    birdInstance.x + spriteWidth > pipeObject.x &&
    birdInstance.y < pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP + pipeObject.pipeHeight &&
    birdInstance.y + singleSpriteHeight > pipeObject.y + pipeObject.pipeHeight + BIRD_PASS_GAP) {
    gameStop();
  }
}


let groundCollisionDetection = () => {
  if (birdInstance.x < 0 + CANVAS_WIDTH &&
    birdInstance.x + spriteWidth > 0 &&
    birdInstance.y < CANVAS_HEIGHT &&
    birdInstance.y + singleSpriteHeight > CANVAS_HEIGHT - backgroundGround.height) {
    gameStop();
  }
}


let deletePipe = (pipeObject) => {
  if (pipeObject.x < -100) {
    listOfPipes.splice(listOfPipes.indexOf(pipeObject), 1);
  }
}

let score, highScore, scoreCalculationList;
let updateScore = (pipeObject) => {
  if (pipeObject.x + pipeObject.width <= birdInstance.x) {
    if (scoreCalculationList.indexOf(pipeObject) === -1) {
      scoreCalculationList.push(pipeObject);
    }
  }
  score = scoreCalculationList.length;
  if (score > localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', score);
  }
}

let gameStop = () => {
  clearInterval(generatePipeInterval);
  window.cancelAnimationFrame(gameInit);
}

let reset = () => {
  //Background.js Variables
  offset = 0;

  //Pipe.js Variables

  //Bird.js variables

  //Script.js Variables
  listOfPipes = [];
  scoreCalculationList = [];
  score = 0;
}

/**
 * CANVAS SETUP FOR SCORE
 */
let scoreCanvas = () => {
  ctx.font = '50px Flappy Bird';
  ctx.fillStyle = 'white';
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeText(`${score}`, CANVAS_WIDTH / 2, 180);
  ctx.fillText(`${score}`, CANVAS_WIDTH / 2, 180);
}

/**
 * CANVAS SETUP FOR HIGHSCORE
 */
let highScoreCanvas = () => {
  ctx.font = '24px Flappy Bird';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeText(`High Score : ${localStorage.getItem('highScore') || 0}`, CANVAS_WIDTH / 2, 100);
  ctx.fillText(`High Score : ${localStorage.getItem('highScore') || 0}`, CANVAS_WIDTH / 2, 100);
}

let startGame = () => {
  reset();
  gameLoop();
}

startGame();



