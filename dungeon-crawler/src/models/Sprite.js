import { TILE_SIZE } from "../config/constants";

class Sprite {
  constructor({
    image,
    frameWidth = null,
    frameHeight = null,
    totalFrames = 1,
    direction = "RIGHT",
    isVisible = true,
  }) {
    this.image = image; // HTMLImageElement or color string
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.totalFrames = totalFrames;
    this.direction = direction;
    this.isVisible = isVisible;
  }

  draw(ctx, x, y, size = TILE_SIZE, frameIndex = 0) {
    if (!this.isVisible) return;

    // Solid color (fallback)
    if (typeof this.image === "string") {
      ctx.fillStyle = this.image;
      ctx.fillRect(x * size, y * size, size, size);
      return;
    }

    // Static image (no animation data)
    if (!this.frameWidth || !this.frameHeight || this.totalFrames <= 1) {
      ctx.drawImage(this.image, x * size, y * size, size, size);
      return;
    }

    // Animated sprite (horizontal sheet)
    const frameX = (frameIndex % this.totalFrames) * this.frameWidth;

    ctx.save();

    if (this.direction === "LEFT") {
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        frameX,
        0,
        this.frameWidth,
        this.frameHeight,
        -(x * size + size),
        y * size,
        size,
        size,
      );
    } else {
      ctx.drawImage(
        this.image,
        frameX,
        0,
        this.frameWidth,
        this.frameHeight,
        x * size,
        y * size,
        size,
        size,
      );
    }

    ctx.restore();
  }

  setDirection(direction) {
    if (direction === "LEFT" || direction === "RIGHT") {
      this.direction = direction;
    }
  }
}

export default Sprite;
