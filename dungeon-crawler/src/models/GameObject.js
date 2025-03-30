class GameObject {
  constructor(id, type, renderableComponent = null) {
    this.id = id;
    this.type = type;
    this.renderableComponent = renderableComponent;
  }

  canDraw() {
    return this.renderableComponent && this.renderableComponent.isVisible;
  }

  draw() {
    if (this.canDraw() && this.renderableComponent) {
      this.renderableComponent.draw();
    }
  }
}

export default GameObject;
