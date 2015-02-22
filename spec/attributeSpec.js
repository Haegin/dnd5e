var Attribute = require('../src/attribute.js');

describe('Attribute', () => {
  it('is created with at least a base value', () => {
    expect(new Attribute(10).value).toEqual(10);
  });

  it('can be created with mods as well', () => {
    expect(new Attribute(10, 2, 3).value).toEqual(15);
  });

  it('lets you set the base value', () => {
    var attr = new Attribute(10, 5);
    attr.base = 5
    expect(attr.value).toEqual(10);
  });
});

// it "allows you to set valid attributes", ->
//   @attrs.strength = 18
//   expect(@attrs.strength).toEqual 18
//
// it "doesn't allow you to set an invalid attribute", ->
//   @attrs.strength = "lots"
//   expect(@attrs.strength).toEqual 10
//
// describe "Getting modifiers", ->
//   it "prepends positive mods with +", ->
//     @attrs.strength = 18
//     expect(@attrs.getModifier("strength")).toEqual "+4"
//
//   it "prepends negative mods with -", ->
//     @attrs.strength = 8
//     expect(@attrs.getModifier("strength")).toEqual "-1"
//
//   it "doesn't prepend anything to zero", ->
//     @attrs.strength = 10
//     expect(@attrs.getModifier("strength")).toEqual "0"
