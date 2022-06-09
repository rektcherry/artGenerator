const drawBackground = () => {
    let rng = Math.floor(Math.random() * 360);
    let rngColor = `hsl(${rng}, 100%, ${background.brightness})`;
    ctx.fillStyle = background.static ? background.default : rngColor;
    ctx.fillRect(0, 0, format.width, format.height);
  };
  module.exports = {drawBackground};