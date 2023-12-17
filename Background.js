class Layer {
  constructor(game, width, height, image, speedModifier) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.game.speed;
  }
  update(delta) {
    this.speed = this.game.speed;
    this.x -= this.speed * this.speedModifier * delta;
    if (this.x <= -this.width) this.x = 0;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width - this.speed,
      this.y,
      this.width,
      this.height
    );
  }
}

export default class Background {
  constructor(game) {
    this.game = game;
    this.width = 2400;
    this.height = 720;
    this.layer1image = document.getElementById('layer-1');
    this.layer2image = document.getElementById('layer-2');
    this.layer3image = document.getElementById('layer-3');
    this.layer4image = document.getElementById('layer-4');
    this.layer5image = document.getElementById('layer-5');
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer1image,
      0.15
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer2image,
      0.3
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer3image,
      0.5
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer4image,
      0.7
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      this.layer5image,
      0.9
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update(delta) {
    this.backgroundLayers.forEach((layer) => {
      layer.update(delta);
    });
  }
  draw(ctx) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
}
