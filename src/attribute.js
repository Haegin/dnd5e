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
    this.base = newValue - this.totalMods;
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

  addMod(mod) {
    this._modifiers.push(mod);
  }

  removeMod(mod) {
    var idx = this._modifiers.indexOf(mod);
    if (idx !== -1)
      this._modifiers.splice(idx, 1);
    else
      throw new Error("Modifier '" + mod + "' not present");
  }
}

module.exports = Attribute;
