/*global describe, it */
'use strict';
require('coffee-script/register');

var Attributes = require('../js/attributes.js');

describe('Attributes', function () {

  beforeEach(function() {
    var defaults = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }

    this.attrs = new Attributes(defaults);
  });

  it('sets up attributes when created', function () {
    expect(this.attrs.strength).toBe(10);
    expect(this.attrs.dexterity).toBe(10);
    expect(this.attrs.constitution).toBe(10);
    expect(this.attrs.intelligence).toBe(10);
    expect(this.attrs.wisdom).toBe(10);
    expect(this.attrs.charisma).toBe(10);
  });

  it("allows you to set valid attributes", function() {
    this.attrs.strength = 18;
    expect(this.attrs.strength).toEqual(18);
  });

  it("doesn't allow you to set an invalid attribute", function() {
    this.attrs.strength = "lots";
    expect(this.attrs.strength).toEqual(10);
  });

  describe("Getting modifiers", function() {
    it("prepends positive mods with +", function() {
      this.attrs.strength = 18;
      expect(this.attrs.getModifier("strength")).toEqual("+4");
    });

    it("prepends negative mods with -", function() {
      this.attrs.strength = 8;
      expect(this.attrs.getModifier("strength")).toEqual("-1");
    });

    it("doesn't prepend anything to zero", function() {
      this.attrs.strength = 10;
      expect(this.attrs.getModifier("strength")).toEqual("0");
    });
  });
});
