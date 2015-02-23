var Attribute = require('../src/attribute.js');

describe('Attribute', () => {
  it('is created with at least a base value', () => {
    expect(new Attribute(10).value).toEqual(10);
  });

  it('can be created with bonuses as well', () => {
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

  it('lets you add extra bonuses', () => {
    var attr = new Attribute(10);
    attr.addBonus(2);
    expect(attr.value).toEqual(12);
  });

  it('lets you remove bonuses', () => {
    var attr = new Attribute(10, 2, 3);
    attr.removeBonus(3);
    expect(attr.value).toEqual(12);
  });

  it('only removes one bonus at a time', () => {
    var attr = new Attribute(10, 2, 2);
    attr.removeBonus(2);
    expect(attr.value).toEqual(12);
  });

  it("errors when trying to remove a bonus that isn't there", () => {
    var attr = new Attribute(10);
    expect( () => attr.removeBonus(3) ).toThrow(new Error("Bonus '3' not present"));
  });

  it("doesn't modify the total when removing a non-existant bonus", () => {
    var attr = new Attribute(10, 2);
    try {
      attr.removeBonus(5);
    } catch (e) {}
    expect(attr.value).toEqual(12);
  });

  it("can calculate it's modifier", () => {
    expect(new Attribute(14).modifier).toEqual(2);
    expect(new Attribute(17).modifier).toEqual(3);

    expect(new Attribute(8).modifier).toEqual(-1);
    expect(new Attribute(5).modifier).toEqual(-3);
  });

  it("includes both the base and the bonuses when calculating the modifier", () => {
    expect(new Attribute(13, 2).modifier).toEqual(2);
    expect(new Attribute(13, -4).modifier).toEqual(-1);
  });
});
