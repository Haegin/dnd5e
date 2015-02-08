_ = require 'lodash'

# Race
# ====
# A simple class to model a D&D 5e race in JS.
#
# Currently supports modifiers and subraces.
class Race
  constructor: (name, info) ->
    @name = name
    @modifiers = info.modifiers
    @subraces = info.subraces ? []

  getSubrace: (subraceName) ->
    _.find @subraces, {name: subraceName}

  getModifiers: (subraceName) ->
    modifiers = {}
    combineModifiers modifiers, @modifiers
    if @getSubrace(subraceName)?
      combineModifiers modifiers, @getSubrace(subraceName).modifiers
    modifiers

  combineModifiers = (acc, mods) ->
    _.forOwn mods, (modifier, attribute) ->
      if acc[attribute]?
        acc[attribute] += modifier
      else
        acc[attribute] = modifier


module.exports = Race
