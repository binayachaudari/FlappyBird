class Pipe {
  constructor(pipe) {
    this.x = pipe.xPos;
    this.y = pipe.yPos;
    this.width = pipeImage.width / 2;
    this.pipeHeight = generateRandomNumber(PIPE_OFFSET,
      CANVAS_HEIGHT - backgroundGround.height - BIRD_PASS_GAP - PIPE_OFFSET);
  }

  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.pipeHeight / 2);
    ctx.rotate(Math.PI);
    ctx.translate(-this.x - this.width / 2, -this.y - this.pipeHeight / 2)
    ctx.drawImage(pipeImage, this.x, this.y, this.width, this.pipeHeight);
    ctx.restore();
    ctx.drawImage(pipeImage, this.x, this.y + this.pipeHeight + BIRD_PASS_GAP, this.width,
      CANVAS_HEIGHT - backgroundGround.height - this.pipeHeight - BIRD_PASS_GAP);
    ctx.closePath();
  }

  update() {
    this.x -= PIPE_SPEED;
  }
}

let pipeImage = new Image();
pipeImage.src = './images/pipe.png';