var _ = require('lodash');

class Attribute {
  constructor(base, ...bonuses) {
    this._base = base;
    this._bonuses = bonuses;
  }

  get value() {
    return this._base + this.totalBonus;
  }

  set value(newValue) {
    this.base = newValue - this.totalBonus;
  }

  get base() {
    return this._base;
  }

  set base(base) {
    this._base = base;
  }

  get totalBonus() {
    return this._bonuses.reduce((prev, curr) => prev + curr, 0);
  }

  addBonus(bonus) {
    this._bonuses.push(bonus);
  }

  removeBonus(bonus) {
    var idx = this._bonuses.indexOf(bonus);
    if (idx !== -1)
      this._bonuses.splice(idx, 1);
    else
      throw new Error("Bonus '" + bonus + "' not present");
  }

  get modifier() {
    return Math.floor((this.value - 10) / 2);
  };
}

module.exports = Attribute;
