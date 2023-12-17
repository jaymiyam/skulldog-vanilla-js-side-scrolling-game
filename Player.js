import { Standing, Jumping, Falling, Running, Rolling } from './State.js';
import { Cloud } from './Enemy.js';

export class Player {
  constructor(game) {
    //basic setup
    this.game = game;
    this.image = document.getElementById('player');
    this.width = 100.5;
    this.height = 91.3;
    this.groundOffset = 120;
    this.x = 10;
    this.y = this.game.height - this.height - this.groundOffset;

    //sprite frames
    this.frameX = 0;
    this.maxFrameX = 6;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    //movement;
    this.vx = 0;
    this.xAcceleration = 0.05;
    this.vy = 0;
    this.gravity = 0.04;

    //state management
    this.states = [
      new Standing(this.game, this),
      new Jumping(this.game, this),
      new Falling(this.game, this),
      new Running(this.game, this),
      new Rolling(this.game, this),
    ];
    this.currentState = this.states[0];
  }
  update(delta, input) {
    //sprite animation
    if (this.frameTimer >= this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    }

    if (this.frameX >= this.maxFrameX) this.frameX = 0;
    this.frameTimer += delta;

    //movement
    this.x += this.vx * this.xAcceleration * delta;
    this.y += this.vy * delta;

    //vertical constraints
    if (!this.onGround()) {
      this.vy += this.gravity;
    }

    if (this.onGround() && this.vy > 0) {
      this.vy = 0;
      this.y = this.game.height - this.height - this.groundOffset;
    }

    //horizontal constraints
    if (this.x <= -this.width) {
      this.x = 0;
    }

    if (this.x >= this.game.width / 2 - this.width / 2) {
      this.x = this.game.width / 2 - this.width / 2;
    }

    //state management
    this.currentState.handleInput(input);
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.groundOffset;
  }

  collisionDetection() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.score++;
        this.game.clouds.push(new Cloud(this.game, enemy.x, enemy.y));
      }
    });
  }

  particlesAnimation() {
    if (this.game.speed > 0) {
      this.game.particles.push(new Particles(this.game));
    }
  }
  setState(state, speed) {
    this.game.speed = speed;
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Particles {
  constructor(game) {
    this.game = game;
    this.game.player = game.player;
    this.x =
      this.game.player.x + Math.random() * 5 + this.game.player.width / 3;
    this.y = this.game.player.y + Math.random() * 5 + this.game.player.height;
    this.size = 8 + Math.random() * 8;
    this.vx = Math.random() * 0.5; //0 - 1
    this.vy = Math.random() * 0.1; //0 - 1
    this.markedForDeletion = false;
  }
  update(delta) {
    this.x -= this.vx * this.game.speed * delta;
    this.y -= this.vy * delta;
    this.size *= 0.95;
    if (this.size < 1) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
  }
}
