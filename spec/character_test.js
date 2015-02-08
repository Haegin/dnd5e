/*global describe, it */
'use strict';

var Character = require('../../js/character.js');
var Race = require('../../js/race.js');
var ruleset = require('../../js/ruleset.js');

describe('Character', function () {

  describe("initalisation", function() {
    it("gets the name from the parameters if it's set", function() {
      expect(new Character({name: "Hjalmar"}).name).toBe("Hjalmar");
    });

    it("sets the name to blank if it's not set", function() {
      expect(new Character({}).name).toBe("");
      expect(new Character({name: undefined}).name).toBe("");
    });

    it("sets the race from the parameters by name if it's set", function() {
      var dorf = new Character({race: "Dwarf"});
      expect(dorf.getModifiers()).toEqual({constitution: 2});
    });

    it("sets the subrace from the parameters by name if it's set", function() {
      var dorf = new Character({race: "Dwarf", subrace: "Hill"});
      expect(dorf.getModifiers()).toEqual({constitution: 2, wisdom: 1});
    });

    it("ignores the subrace if it's invalid for the race", function() {
      var dorf = new Character({race: "Dwarf", subrace: "Dark"});
      expect(dorf.getModifiers()).toEqual({constitution: 2});
    });

    it("ignores the race if it's not known", function() {
      var merfolk = new Character({race: "Merfolk"});
      expect(merfolk.getModifiers()).toEqual({});
    });
  });

  describe("changing races", function() {
    beforeEach(function() {
      this.hjalmar = new Character({name: "Hjalmar", race: "Dwarf", subrace: "Mountain"});
    });

    it("can change subrace", function() {
      this.hjalmar.subrace = "Hill";
      expect(this.hjalmar.getModifiers()).toEqual({constitution: 2, wisdom: 1});
    });

    it("can change race", function() {
      this.hjalmar.race = "Elf";
      expect(this.hjalmar.getModifiers()).toEqual({dexterity: 2});
    });

    it("ignores an invalid subrace", function() {
      this.hjalmar.subrace = "Dark";
      expect(this.hjalmar.getModifiers()).toEqual({constitution: 2});
    });
  });

});
