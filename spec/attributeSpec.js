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

  it('lets you set the total value', () => {
    var attr = new Attribute(10, 5);
    attr.value = 17
    expect(attr.base).toEqual(12);
  });

  it('lets you add extra mods', () => {
    var attr = new Attribute(10);
    attr.addMod(2);
    expect(attr.value).toEqual(12);
  });

  it('lets you remove mods', () => {
    var attr = new Attribute(10, 2, 3);
    attr.removeMod(3);
    expect(attr.value).toEqual(12);
  });

  it('only removes one mod at a time', () => {
    var attr = new Attribute(10, 2, 2);
    attr.removeMod(2);
    expect(attr.value).toEqual(12);
  });

  it("errors when trying to remove a mod that isn't there", () => {
    var attr = new Attribute(10);
    expect( () => attr.removeMod(3) ).toThrow(new Error("Modifier '3' not present"));
  });

  it("doesn't modify the total when removing a non-existant mod", () => {
    var attr = new Attribute(10, 2);
    try {
      attr.removeMod(5);
    } catch (e) {}
    expect(attr.value).toEqual(12);
  });
});
