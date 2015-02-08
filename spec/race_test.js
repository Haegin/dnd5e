/*global describe, it */
'use strict';
require('coffee-script/register');

var Race = require('../js/race.coffee');

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

  it('returns undefined for a missing subrace', function() {
    expect(dwarf.getSubrace("Desert")).toEqual(undefined);
  });

  it('can combine modifiers with a subrace', function() {
    var combinedMods = dwarf.getModifiers("Hill");
    expect(combinedMods.constitution).toBe(2);
    expect(combinedMods.wisdom).toBe(1);
  });

  it('combines modifiers in a non-destructive way', function() {
    dwarf.getModifiers("Hill");
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
