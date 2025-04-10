class Sprite {
  constructor(image, isVisible = true) {
    this.image = image; // could be HTMLImageElement or color
    this.isVisible = isVisible;
  }

  draw(ctx, x, y, size = 50) {
    if (typeof this.image === "string") {
      ctx.fillStyle = this.image;
      ctx.fillRect(x * size, y * size, size, size);
    } else if (this.image instanceof HTMLImageElement) {
      ctx.drawImage(this.image, x * size, y * size, size, size);
    }
  }
}
