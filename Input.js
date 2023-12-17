export default class Input {
  constructor(game) {
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
          break;
        case 'ArrowDown':
          if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
          break;
        case 'ArrowLeft':
          if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
          break;
        case 'ArrowRight':
          if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.keys.indexOf(e.key) > -1)
            this.keys.splice(this.keys.indexOf(e.key), 1);
          break;
        case 'ArrowDown':
          if (this.keys.indexOf(e.key) > -1)
            this.keys.splice(this.keys.indexOf(e.key), 1);
          break;
        case 'ArrowLeft':
          if (this.keys.indexOf(e.key) > -1)
            this.keys.splice(this.keys.indexOf(e.key), 1);
          break;
        case 'ArrowRight':
          if (this.keys.indexOf(e.key) > -1)
            this.keys.splice(this.keys.indexOf(e.key), 1);
          break;
      }
    });
  }
}
