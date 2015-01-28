function Race(info) {
  this.name = info.name;
  this.modifiers = info.modifiers;
  this.subraces = info.subraces || [];

  this.getSubrace = function(subraceName) {
    var subrace = _.find(this.subraces, {name: subraceName});
    return subrace || this.subraces[0];
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
  };
};

window.ruleset = {
  races: [
    new Race({
      name: "Human",
      modifiers: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1}
    }),
    new Race({
      name: "Dwarf",
      modifiers: {constitution: 2},
      subraces: [
        {
          name: "Hill",
          modifiers: {wisdom: 1},
        },
        {
          name: "Mountain",
          modifiers: {strength: 2},
        }
      ],
    }),
    new Race({
      name: "Elf",
      modifiers: {dexterity: 2},
      subraces: [
        {
          name: "Wood",
          modifiers: {wisdom: 1}
        }
      ]
    }),
    new Race({
      name: "Halfling",
      modifiers: {dexterity: 2},
    }),
    new Race({
      name: "Gnome",
      modifiers: {intelligence: 2},
    }),
    new Race({
      name: "Dragonborn",
      modifiers: {strength: 2, charisma: 1},
    }),
    new Race({
      name: "Half Elf",
      modifiers: {charisma: 2},
    }),
    new Race({
      name: "Half Orc",
      modifiers: {strength: 2, constitution: 1}
    }),
    new Race({
      name: "Tiefling",
      modifiers: {charisma: 2, intelligence: 1}
    }),
    new Race({
      name: "Aasimar",
      modifiers: {charisma: 2, wisdom: 1}
    }),
  ],
  attributes: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
  getRace: function (name) {
    return _.find(this.races, {'name': name});
  }
};
