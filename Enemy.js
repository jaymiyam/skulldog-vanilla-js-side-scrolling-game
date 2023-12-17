class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.frameTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.groundOffset = 120;
  }
  update(delta) {
    //sprite animation
    if (this.frameTimer >= this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    }
    this.frameTimer += delta;

    if (this.frameX >= this.maxFrameX) this.frameX = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Digger extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('enemy-digger');
    this.spriteWidth = 260;
    this.spriteHeight = 178;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.maxFrameX = 8;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.groundOffset;
  }
  update(delta) {
    super.update(delta);
    this.x -= this.game.speed * delta;

    if (this.x < -this.width) this.markedForDeletion = true;
  }
  //   draw(ctx) {
  //     super.draw(ctx);
  //   }
}

export class Ghost extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('enemy-ghost');
    this.spriteWidth = 80;
    this.spriteHeight = 89;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.maxFrameX = 1;
    this.x = this.game.width;
    this.y = 50 + Math.random() * this.game.height * 0.5;
    this.vx = 0.3;
    this.angle = 0;
    this.angleIncrement = 0.1 + Math.random() * 0.1;
  }
  update(delta) {
    super.update(delta);
    this.x -= this.vx * delta;
    this.y += Math.sin(this.angle) * 1;
    this.angle += this.angleIncrement;

    if (this.x < -this.width) this.markedForDeletion = true;
  }
  //   draw() {}
}

export class Spider extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('enemy-spider');
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.maxFrameX = 5;
    this.x = this.game.width;
    this.y = 40 + Math.random() * 30;
    this.vy = 0.1;
  }
  update(delta) {
    super.update(delta);

    this.x -= this.game.speed * delta;
    this.y += this.vy * delta;
    let randomBoundary = 200 + Math.random() * 300;
    if (this.y >= randomBoundary) this.vy = -Math.abs(this.vy);

    if (this.x < -this.width) this.markedForDeletion = true;
  }
  draw(ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 10);
    ctx.stroke();
  }
}

export class Zombie extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById('enemy-zombie');
    this.spriteWidth = 292;
    this.spriteHeight = 410;
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.maxFrameX = 7;
    this.x = this.game.width + Math.random() * 100;
    this.y = this.game.height - this.height - this.groundOffset;
    this.vx = 0.4;
  }
  update(delta) {
    super.update(delta);
    this.x -= this.vx * delta;
    if (this.x < -this.width) this.markedForDeletion = true;
  }
  //   draw() {}
}

export class Cloud extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById('cloud');
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.maxFrameX = 4;
    this.x = x;
    this.y = y;
  }

  update(delta) {
    if (this.frameTimer >= this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    }
    this.frameTimer += delta;

    if (this.frameX > this.maxFrameX) this.markedForDeletion = true;
  }
}
