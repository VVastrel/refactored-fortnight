import GameObject from "./GameObject.js";

class Item extends GameObject {
  constructor(id, name, description) {
    super(id, name, "Item");
    this.description = description; // item description
  }
}

export default Item;
