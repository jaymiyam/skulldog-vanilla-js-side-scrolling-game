import Input from './Input.js';
import { Player } from './Player.js';
import Background from './Background.js';
import { Digger, Ghost, Spider, Zombie, Cloud } from './Enemy.js';
import { displayScore } from './Utils.js';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 720;

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.score = 0;
    this.gameOver = false;
    this.gameTime = 0;

    this.input = new Input(this);
    this.player = new Player(this);
    this.background = new Background(this);

    //handle enemies
    this.spawnInterval = 500;
    this.spawnTimer = 0;
    this.enemyTypes = ['Digger', 'Ghost', 'Spider', 'Zombie'];
    this.enemies = [];
    this.clouds = [];

    //handle particles;
    this.particles = [];
  }
  update(delta, input) {
    //handle gameOver
    if (this.score >= 100) {
      this.gameOver = true;
    }
    //handle timer
    this.gameTime += delta;

    this.background.update(delta);
    this.player.update(delta, input);
    this.player.collisionDetection();
    this.player.particlesAnimation();

    //handle enemies
    if (this.spawnTimer >= this.spawnInterval) {
      this.#addEnemy();
      this.spawnTimer = 0;
    }
    this.spawnTimer += delta;
    this.enemies.forEach((enemy) => {
      enemy.update(delta);
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    //handle collision animation
    this.clouds.forEach((cloud) => {
      cloud.update(delta);
    });

    this.clouds = this.clouds.filter((cloud) => !cloud.markedForDeletion);

    //handle particles animation
    this.particles.forEach((particle) => {
      particle.update(delta);
    });

    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.clouds.forEach((cloud) => {
      cloud.draw(ctx);
    });
    this.particles.forEach((particle) => {
      particle.draw(ctx);
    });
  }

  #addEnemy() {
    let randomEnemy =
      this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
    switch (randomEnemy) {
      case 'Digger':
        if (this.speed > 0) {
          this.enemies.push(new Digger(this));
        }
        break;
      case 'Ghost':
        this.enemies.push(new Ghost(this));
        break;
      case 'Zombie':
        this.enemies.push(new Zombie(this));
        break;
      case 'Spider':
        if (this.speed > 0) {
          this.enemies.push(new Spider(this));
        }
        break;
    }
  }
}

const splashScreen = document.getElementById('splash-screen');
const game = new Game(canvas.width, canvas.height);
game.background.draw(ctx);
game.player.draw(ctx);

window.addEventListener(
  'keypress',
  (e) => {
    if (e.key === 'Enter') {
      splashScreen.style.display = 'none';

      let lastTime;
      function update(currentTime) {
        //handle gameOver
        if (game.gameOver) {
          endGame();
          return;
        }

        if (!lastTime) {
          lastTime = currentTime;
          window.requestAnimationFrame(update);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const delta = currentTime - lastTime;

        //animation code
        game.update(delta, game.input);
        game.draw(ctx);
        displayScore(ctx, game);

        lastTime = currentTime;
        window.requestAnimationFrame(update);
      }

      window.requestAnimationFrame(update);
    }
  },
  { once: true }
);

function endGame() {
  let finalTime = game.gameTime;

  splashScreen.style.display = 'flex';
  splashScreen.innerHTML = `
    <h2>YOUR TIME:</h2>
      <h1>${(finalTime / 1000).toFixed(2)} SECONDS</h1>
    `;
}
