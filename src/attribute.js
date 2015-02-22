var _ = require('lodash');

class Attribute {
  constructor(base, ...modifiers) {
    this._base = base;
    this._modifiers = modifiers;
  }

  get value() {
    return this._base + this.totalMods;
  }

  set value(newValue) {
    base = newValue - this.totalMods;
  }

  get base() {
    return this._base;
  }

  set base(base) {
    this._base = base;
  }

  get totalMods() {
    return this._modifiers.reduce((prev, curr) => prev + curr, 0);
  }
}

module.exports = Attribute;
