var Attributes = require('../src/attributes.js');

describe('Attributes', function () {

  it('sets up attributes when created', function () {
    var attrs = new Attributes();
    expect(attrs.strength.value).toBe(10);
    expect(attrs.dexterity.value).toBe(10);
    expect(attrs.constitution.value).toBe(10);
    expect(attrs.intelligence.value).toBe(10);
    expect(attrs.wisdom.value).toBe(10);
    expect(attrs.charisma.value).toBe(10);
  });

  it('can take an object to set different starting values', () => {
    var attrs = new Attributes({strength: [16], wisdom: [12, 2]});
    expect(attrs.strength.value).toBe(16);
    expect(attrs.wisdom.value).toBe(14);
  });
});

