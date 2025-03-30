// Sprite.js
class Sprite {
  constructor(width, height, color) {
    this.width = width; // Width of the sprite
    this.height = height; // Height of the sprite
    this.color = color; // Color of the sprite
    this.isVisible = true; // Indicates if the sprite can be rendered
  }

  getDescription() {
    return {
      width: this.width,
      height: this.height,
      color: this.color,
    };
  }

  draw(context) {
    if (this.isVisible) {
      const { width, height, color } = this.getDescription();
      context.fillStyle = color; // Set the fill color
      context.fillRect(width, height); // Draw the rectangle
    }
  }
}

export default Sprite;
