require('./spec_helper.js')

Character = require '../js/character.js'
Race = require '../js/race.coffee'
ruleset = require '../js/ruleset.js'

describe 'Character', ->

  describe "initalisation", ->
    it "gets the name from the parameters if it's set", ->
      expect(new Character({name: "Hjalmar"}).name).toBe "Hjalmar"

    it "sets the name to blank if it's not set", ->
      expect(new Character({}).name).toBe("")
      expect(new Character({name: undefined}).name).toBe ""

    it "sets the race from the parameters by name if it's set", ->
      dorf = new Character {race: "Dwarf"}
      expect(dorf.getModifiers()).toEqual {constitution: 2}

    it "sets the subrace from the parameters by name if it's set", ->
      dorf = new Character {race: "Dwarf", subrace: "Hill"}
      expect(dorf.getModifiers()).toEqual {constitution: 2, wisdom: 1}

    it "ignores the subrace if it's invalid for the race", ->
      dorf = new Character {race: "Dwarf", subrace: "Dark"}
      expect(dorf.getModifiers()).toEqual {constitution: 2}

    it "ignores the race if it's not known", ->
      merfolk = new Character {race: "Merfolk"}
      expect(merfolk.getModifiers()).toEqual {}

  describe "changing races", ->
    beforeEach ->
      @hjalmar = new Character {name: "Hjalmar", race: "Dwarf", subrace: "Mountain"}

    it "can change subrace", ->
      @hjalmar.subrace = "Hill"
      expect(@hjalmar.getModifiers()).toEqual {constitution: 2, wisdom: 1}

    it "can change race", ->
      @hjalmar.race = "Elf"
      expect(@hjalmar.getModifiers()).toEqual {dexterity: 2}

    it "ignores an invalid subrace", ->
      @hjalmar.subrace = "Dark"
      expect(@hjalmar.getModifiers()).toEqual {constitution: 2}

