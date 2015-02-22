var Race = require('./race.js');
var _ = require('lodash');
var Immutable = require('immutable');

module.exports = {
  races: [
    new Race("Human", {
      modifiers: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1}
    }),
    new Race("Dwarf", {
      modifiers: {constitution: 2},
      subraces: [
        new Race("Hill", {modifiers: {wisdom: 1}}),
        new Race("Mountain", {modifiers: {strength: 2}}),
      ],
    }),
    new Race("Elf", {
      modifiers: {dexterity: 2},
      subraces: [
        new Race("High", {modifiers: {intelligence: 1}}),
        new Race("Wood", {modifiers: {wisdom: 1}}),
        new Race("Dark", {modifiers: {charisma: 1}}),
        new Race("Eladrin", {modifiers: {intelligence: 1}}),
      ]
    }),
    new Race("Halfling", {
      modifiers: {dexterity: 2},
      subraces: [
        new Race("Stout", {modifiers: {constitution: 1}}),
        new Race("Lightfoot", {modifiers: {charisma: 1}}),
      ],
    }),
    new Race("Gnome", {
      modifiers: {intelligence: 2},
      subraces: [
        new Race("Forest", {modifiers: {dexterity: 1}}),
        new Race("Rock", {modifiers: {constitution: 1}}),
      ],
    }),
    new Race("Dragonborn", {
      modifiers: {strength: 2, charisma: 1},
    }),
    new Race("Half Elf", {
      modifiers: {charisma: 2},
    }),
    new Race("Half Orc", {
      modifiers: {strength: 2, constitution: 1}
    }),
    new Race("Tiefling", {
      modifiers: {charisma: 2, intelligence: 1}
    }),
    new Race("Aasimar", {
      modifiers: {charisma: 2, wisdom: 1}
    }),
  ],
  attributes: Immutable.Set(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']),
  getRace: function (name) {
    return _.find(this.races, {'name': name});
  }
};
