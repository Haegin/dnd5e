/*global describe, it */
'use strict';

var Race = require('../../js/race.js');

describe('Race', function () {
  // var dwarf = {name: "Dwarf"};
  var hill = new Race("Hill", {modifiers: {wisdom: 1}});
  var dwarf = new Race("Dwarf", {
    modifiers: {constitution: 2},
    subraces: [
      hill,
      new Race("Mountain", {modifiers: {strength: 2}}),
    ]
  });

  it('knows the name of the race', function () {
    expect(dwarf.name).toBe("Dwarf");
  });

  it('can get a subrace', function() {
    expect(dwarf.getSubrace("Hill")).toEqual(hill);
  });

  it('can combine modifiers with a subrace', function() {
    var combinedMods = dwarf.getModifiers("Hill");
    expect(combinedMods.constitution).toBe(2);
    expect(combinedMods.wisdom).toBe(1);
  });

  it("ignores unknown subraces", function() {
    var combinedMods = dwarf.getModifiers("Wood");
    expect(combinedMods.constitution).toBe(2);
  });

  it("doesn't have to have a subrace", function() {
    var dragonborn = new Race("Dragonborn", {modifiers: {strength: 2, charisma: 1}});
    expect(dragonborn.getModifiers()).toEqual({strength: 2, charisma: 1});
  });
});
