require './spec_helper.js'

Attributes = require('../js/attributes.js')

describe 'Attributes', ->

  beforeEach ->
    defaults = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }

    @attrs = new Attributes defaults

  it 'sets up attributes when created', ->
    expect(@attrs.strength).toBe 10
    expect(@attrs.dexterity).toBe 10
    expect(@attrs.constitution).toBe 10
    expect(@attrs.intelligence).toBe 10
    expect(@attrs.wisdom).toBe 10
    expect(@attrs.charisma).toBe 10

  it "allows you to set valid attributes", ->
    @attrs.strength = 18
    expect(@attrs.strength).toEqual 18

  it "doesn't allow you to set an invalid attribute", ->
    @attrs.strength = "lots"
    expect(@attrs.strength).toEqual 10

  describe "Getting modifiers", ->
    it "prepends positive mods with +", ->
      @attrs.strength = 18
      expect(@attrs.getModifier("strength")).toEqual "+4"

    it "prepends negative mods with -", ->
      @attrs.strength = 8
      expect(@attrs.getModifier("strength")).toEqual "-1"

    it "doesn't prepend anything to zero", ->
      @attrs.strength = 10
      expect(@attrs.getModifier("strength")).toEqual "0"
