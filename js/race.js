var _ = require('lodash');

module.exports = function Race(name, info) {
  this.name = name;
  this.modifiers = info.modifiers;
  this.subraces = info.subraces || [];

  this.getSubrace = function(subraceName) {
    var subrace = _.find(this.subraces, {name: subraceName});
    return subrace;
  };

  this.getModifiers = function(subraceName) {
    var modifiers = {};
    combineModifiers(modifiers, this.modifiers);
    if (typeof(this.getSubrace(subraceName)) !== "undefined") {
      combineModifiers(modifiers, this.getSubrace(subraceName).modifiers);
    }
    return modifiers;
  };

  function combineModifiers(acc, mods) {
    _.forOwn(mods, function(modifier, attribute) {
      if (typeof acc[attribute] === "undefined") {
        acc[attribute] = modifier;
      } else {
        acc[attribute] += modifier;
      }
    });
  }
};
