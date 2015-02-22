/*global describe, it */
'use strict';

var Character = require('../../js/character.js');
var Race = require('../../js/race.js');

describe('Character', function () {
  var character = new Character("Hjalmar");
  character.races = [
    new Race("Dwarf", { modifiers: {constitution: 2}}),
    new Race("Mountain", {modifiers: {strength: 2}}),
  ];

  it('knows the name of the character', function () {
    expect(character.name).toBe("Hjalmar");
  });

  it('can get the combined modifiers', function() {
    expect(character.getModifiers()).toEqual(
      {constitution: 2, strength: 2}
    );
  });
});
