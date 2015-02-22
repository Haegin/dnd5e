var _ = require('lodash');

// Race
// ====
// A simple class to model a D&D 5e race in JS.
//
// Currently supports modifiers and subraces.
class Race {
  constructor(name, info) {
    this.name = name;
    this.modifiers = info.modifiers;
    this.subraces = info.subraces || [];
  }

  getSubrace (subraceName) {
    return _.find(this.subraces, {name: subraceName});
  }

  hasSubrace (subraceName) {
    return (getSubrace(subraceName) !== undefined);
  }

  getModifiers (subraceName) {
    var modifiers = {};
    __combineModifiers(modifiers, this.modifiers);
    if (this.hasSubrace(subraceName)) {
      __combineModifiers(modifiers, this.getSubrace(subraceName).modifiers);
    }
    return modifiers;
  }

  __combineModifiers (acc, mods) {
    _.forOwn(mods, function (modifier, attribute) {
      if (acc[attribute] !== undefined) {
        acc[attribute] += modifier;
      } else {
        acc[attribute] = modifier;
      }
    })
  };
}

module.exports = Race;
