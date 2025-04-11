import GameObject from "./GameObject.js";

class Character extends GameObject {
  constructor(
    id,
    type,
    x,
    y,
    sprite,
    frameWidth,
    frameHeight,
    totalFrames = 1,
  ) {
    super(id, type); // type will be 'enemy' or 'player'
    this.x = x;
    this.y = y;
    this.size = 30;
    this.direction = "RIGHT";
    this.image = sprite;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.totalFrames = totalFrames;

    this.renderableComponent = {
      isVisible: true,
      draw: (ctx, frameIndex) => {
        const img = new Image();
        img.src = this.image;
        const frameX = frameIndex * this.frameWidth;

        ctx.save();

        if (this.direction === "LEFT") {
          ctx.scale(-1, 1);
          ctx.drawImage(
            img,
            frameX,
            0,
            this.frameWidth,
            this.frameHeight,
            -(this.x * this.size + this.size),
            this.y * this.size,
            this.size,
            this.size,
          );
        } else {
          ctx.drawImage(
            img,
            frameX,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size,
          );
        }

        ctx.restore();
      },
    };
  }

  isAlive() {
    return this.stats?.hp > 0;
  }

  getAttackPower() {
    return this.stats?.attack ?? 0;
  }

  getDefense() {
    return this.stats?.defense ?? 0;
  }
}

export default Character;
