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
}

let updateAll = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  groundUpdate();
  listOfPipes.forEach((eachPipe, index) => {
    eachPipe.update();
  });
  birdInstance.update();
}

// let deltaTime = 0,
//   lastTime = (new Date()).getTime();

let gameLoop = () => {
  // let currentTime = (new Date()).getTime();
  // deltaTime = (currentTime - lastTime) / 1000;
  updateAll();
  drawAll();
  // lastTime = currentTime;
  window.requestAnimationFrame(gameLoop);
}

let listOfPipes = [];

let generatePipes = () => {
  setInterval(() => {
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

let gameInit = window.requestAnimationFrame(gameLoop);