var _ = require('lodash');
var ruleset = require('./ruleset.js');

module.exports = function Character(info) {

  function initialize (character, info) {
    character.name = info["name"] || "";
    character.race = info["race"];
    character.subrace = info["subrace"];
  };

  Object.defineProperties(this, {
    'race': {
      set: function (raceName) {
        this.subrace = undefined;
        this._race = ruleset.getRace(raceName);
      },
      get: function() { return this._race; }
    },
    'subrace': {
      set: function (subraceName) {
        if (this.race !== undefined) { this._subrace = this.race.getSubrace(subraceName); }
      },
      get: function() { return this._subrace; }
    }
  });

  initialize(this, info);

  this.getModifiers = function () {
    var modifiers = {};
    _.each([this.race || {}, this.subrace || {}], function (race) {
      combineModifiers(modifiers, race.modifiers);
    });
    return modifiers;
  };

  function combineModifiers (acc, mods) {
    _.forOwn(mods, function (modifier, attribute) {
      if (typeof acc[attribute] === "undefined") {
        acc[attribute] = modifier;
      } else {
        acc[attribute] += modifier;
      }
    });
  };
};
