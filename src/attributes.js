var _ = require('lodash');
var ruleset = require('./ruleset.js');
var Attribute = require('./attribute.js');

class Attributes {
  constructor(stats) {
    stats = stats || {};
    var self = this;
    this._attributes = ruleset.attributes.reduce(function(attrs, attrName) {
      attrName = attrName.toLowerCase();
      var values = stats[attrName] || [10];
      attrs[attrName] = self._createAttribute(values);
      return attrs;
    }, {});
  }

  get strength() {
    return this._attributes.strength;
  }

  get dexterity() {
    return this._attributes.dexterity;
  }

  get constitution() {
    return this._attributes.constitution;
  }

  get intelligence() {
    return this._attributes.intelligence;
  }

  get wisdom() {
    return this._attributes.wisdom;
  }

  get charisma() {
    return this._attributes.charisma;
  }

  // private

  _createAttribute(attribute_and_mods) {
    var [base, ...bonuses] = attribute_and_mods;
    var attr = new Attribute(base);
    for (var i=0; i < bonuses.length; i++) {
      attr.addBonus(bonuses[i]);
    }
    return attr;
  }
};

module.exports = Attributes;
