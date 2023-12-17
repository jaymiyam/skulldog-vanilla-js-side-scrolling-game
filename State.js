export const states = {
  STANDING: 0,
  JUMPING: 1,
  FALLING: 2,
  RUNNING: 3,
  ROLLING: 4,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Standing extends State {
  constructor(game, player) {
    super('STANDING');
    this.game = game;
    this.player = player;
  }

  enter() {
    this.player.maxFrameX = 6;
    this.player.frameY = 0;
    this.player.vx = 0;
    this.player.vy = 0;
  }

  handleInput(input) {
    if (input.keys.includes('ArrowUp')) {
      this.player.setState(states.JUMPING, 1);
    }
    if (input.keys.includes('ArrowRight')) {
      this.player.setState(states.RUNNING, 1);
    }
  }
}

export class Jumping extends State {
  constructor(game, player) {
    super('JUMPING');
    this.game = game;
    this.player = player;
  }

  enter() {
    this.player.maxFrameX = 6;
    this.player.frameY = 1;
    this.player.vx = 1;
    if (this.player.onGround()) {
      this.player.vy = -2;
    }
  }

  handleInput(input) {
    if (this.player.vy >= 0) this.player.setState(states.FALLING, 1);
    if (input.keys.includes('ArrowDown'))
      this.player.setState(states.ROLLING, 1);
  }
}

export class Falling extends State {
  constructor(game, player) {
    super('FALLING');
    this.game = game;
    this.player = player;
  }

  enter() {
    this.player.maxFrameX = 6;
    this.player.frameY = 2;
    //   this.player.vx = 0.2;
    // this.player.vy = 0;
  }

  handleInput(input) {
    if (this.player.onGround()) this.player.setState(states.STANDING, 0);
    if (input.keys.includes('ArrowDown'))
      this.player.setState(states.ROLLING, 1);
  }
}

export class Running extends State {
  constructor(game, player) {
    super('RUNNING');
    this.game = game;
    this.player = player;
  }

  enter() {
    this.player.maxFrameX = 8;
    this.player.frameY = 3;
    this.player.vx = 1.2;
  }

  handleInput(input) {
    if (!input.keys.includes('ArrowRight'))
      this.player.setState(states.STANDING, 0);
    if (input.keys.includes('ArrowUp')) this.player.setState(states.JUMPING, 1);
    if (input.keys.includes('ArrowDown'))
      this.player.setState(states.ROLLING, 1);
  }
}

export class Rolling extends State {
  constructor(game, player) {
    super('ROLLLING');
    this.game = game;
    this.player = player;
  }

  enter() {
    this.player.maxFrameX = 6;
    this.player.frameY = 6;
    this.player.vx = 2;
    this.player.vy = 0;
  }

  handleInput(input) {
    if (!input.keys.includes('ArrowDown'))
      this.player.setState(states.RUNNING, 1);
    if (!input.keys.includes('ArrowRight') && this.player.onGround())
      this.player.setState(states.STANDING, 0);
  }
}
