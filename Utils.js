export function displayScore(ctx, game) {
  ctx.font = '30px Courier New';
  ctx.fillStyle = 'black';
  ctx.fillText('Score:' + game.score, 20, 50);
  ctx.fillText('Time :' + (game.gameTime / 1000).toFixed(2), 20, 100);
}
