var _ = require('lodash');
var ruleset = require('./ruleset.js');

module.exports = function Attributes(stats) {

  var attributes = ruleset.attributes.map(function(attr) { return attr.toLowerCase() });

  var setAttribute = function (name, value) {
    var value = parseInt(value);
    if (!isNaN(value)) { this["_" + name] = value };
  }

  Object.defineProperties(this, {
    strength: {
        set: setAttribute.bind(this, "strength"),
        get: function() { return this._strength; }
      },
    dexterity: {
        set: setAttribute.bind(this, "dexterity"),
        get: function() { return this._dexterity; }
      },
    constitution: {
        set: setAttribute.bind(this, "constitution"),
        get: function() { return this._constitution; }
      },
    intelligence: {
        set: setAttribute.bind(this, "intelligence"),
        get: function() { return this._intelligence; }
      },
    wisdom: {
        set: setAttribute.bind(this, "wisdom"),
        get: function() { return this._wisdom; }
      },
    charisma: {
        set: setAttribute.bind(this, "charisma"),
        get: function() { return this._charisma; }
      },
  });

  this.strength = stats.strength;
  this.dexterity = stats.dexterity;
  this.constitution = stats.constitution;
  this.intelligence = stats.intelligence;
  this.wisdom = stats.wisdom;
  this.charisma = stats.charisma;

  this.getModifier = function(attrName) {
    var mod = Math.floor((this[attrName] - 10) / 2);
    return (mod > 0 ? "+" + mod : mod.toString());
  };
};
