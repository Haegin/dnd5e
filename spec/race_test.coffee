require('./spec_helper.js');
Race = require '../js/race.coffee'

describe 'Race', ->
  hill = new Race("Hill", {modifiers: {wisdom: 1}})
  dwarf = new Race("Dwarf", {
    modifiers: {constitution: 2},
    subraces: [
      hill,
      new Race("Mountain", {modifiers: {strength: 2}}),
    ]
  })

  it 'knows the name of the race', ->
    expect(dwarf.name).toBe("Dwarf")

  it 'can get a subrace', ->
    expect(dwarf.getSubrace("Hill")).toEqual(hill)

  it 'returns undefined for a missing subrace', ->
    expect(dwarf.getSubrace("Desert")).toEqual(undefined)

  it 'can combine modifiers with a subrace', ->
    combinedMods = dwarf.getModifiers("Hill")
    expect(combinedMods.constitution).toBe(2)
    expect(combinedMods.wisdom).toBe(1)

  it 'combines modifiers in a non-destructive way', ->
    dwarf.getModifiers("Hill")
    combinedMods = dwarf.getModifiers("Hill")
    expect(combinedMods.constitution).toBe(2)
    expect(combinedMods.wisdom).toBe(1)

  it "ignores unknown subraces", ->
    combinedMods = dwarf.getModifiers("Wood")
    expect(combinedMods.constitution).toBe(2)

  it "doesn't have to have a subrace", ->
    dragonborn = new Race("Dragonborn", {modifiers: {strength: 2, charisma: 1}})
    expect(dragonborn.getModifiers()).toEqual({strength: 2, charisma: 1})
