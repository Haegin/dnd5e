var React = require('react/addons');
var _ = require('lodash');

var ruleset = require('../ruleset.js');
var Attributes = require('../attributes.js');
var Character = require('../character.js');
var Race = require('../race.js');

var Attribute = React.createClass({
  updateAttribute: function (evt) {
    var newValue = parseInt(evt.target.value);
    localStorage.setItem(this.props.name.toLowerCase(), newValue);
    this.props.change(newValue);
  },
  render: function () {
    return <tr className="attribute">
             <td><label htmlFor={this.props.key}>{this.props.name}</label></td>
             <td><input
               id={this.props.key}
               className="base"
               value={this.props.value}
               onChange={this.updateAttribute}
               ref="value"
             /></td>
             <td><span className="modifier">{this.props.mod}</span></td>
           </tr>;
  }
});

var AttributeList = React.createClass({
  getInitialState: function () {
    return {
      attributes: new Attributes({
        strength: localStorage.getItem("strength") || 10,
        dexterity: localStorage.getItem("dexterity") || 10,
        constitution: localStorage.getItem("constitution") || 10,
        intelligence: localStorage.getItem("intelligence") || 10,
        wisdom: localStorage.getItem("wisdom") || 10,
        charisma: localStorage.getItem("charisma") || 10,
      })
    };
  },
  changeAttribute: function (name, value) {
    var attrs = this.state.attributes;
    attrs[name] = value;
    this.setState({ attributes: attrs });
  },
  render: function () {
    var attributeNodes = ruleset.attributes.map((attributeName) => {
      var key = attributeName.toLowerCase();
      return (<Attribute
          name={attributeName}
          key={key}
          mod={this.state.attributes.getModifier(key)}
          value={this.state.attributes[key]}
          change={this.changeAttribute.bind(this, key)}
          />);
    });
    return <table className="attributes">
             <thead>
               <tr><th>Attribute</th><th>Total</th><th>Mod</th></tr>
             </thead>
             <tbody>
               {attributeNodes}
             </tbody>
           </table>;
  }
});

var Editable = React.createClass({
  getInitialState: function() { return {value: localStorage.getItem(this.props.name) || ""} },
  update: function() {
    var newValue = this.refs.field.getDOMNode().value.trim();
    this.setState({value: newValue});
    localStorage.setItem(this.props.name, newValue);
  },
  render: function() {
    return <p><input placeholder={this.props.name} ref="field" onChange={this.update} value={this.state.value} /></p>;
  }
});

var RaceSelect = React.createClass({
  propTypes: {
    race: React.PropTypes.instanceOf(Race),
    subrace: React.PropTypes.instanceOf(Race)
  },
  getDefaultProps: function() {
    return {
      race: ruleset.races[0],
      subrace: ruleset.races[0].subraces[0]
    }
  },
  update: function() {
    var newRace = this.refs.race.getDOMNode().value.trim();
    var newSubrace = this.refs.subrace.getDOMNode().value.trim();
    this.props.onChange(newRace, newSubrace);
  },
  render: function() {
    var raceOptions = ruleset.races.map(function(race) {
      return (<option value={race.name} key={race.name}>{race.name}</option>);
    });
    var subraces = ruleset.getRace(this.props.race.name).subraces;
    var subraceOptions = subraces.map(function(subrace) {
        return (<option value={subrace.name} key={subrace.name}>{subrace.name}</option>);
      });
    var subraceSelect = (<select ref="subrace" onChange={this.update} value={this.props.subrace} style={subraces.length > 0 ? {} : {display: "none"}}>
        {subraceOptions}
        </select>);
    return <p>
      <select ref="race" onChange={this.update} value={this.props.race.name}>
        {raceOptions}
      </select>
      {typeof(subraceSelect) === "undefined" ? "" : subraceSelect}
    </p>;
  }
});


var CharacterSheet = React.createClass({
  getInitialState: function() {
    var character = new Character({
      name: localStorage.getItem("name"),
      race: localStorage.getItem("race"),
      subrace: localStorage.getItem("subrace")
    });
    return {
      character: character,
    }
  },
  changeRace: function(newRaceName, newSubraceName) {
    var character = this.state.character;
    character.race = newRaceName;
    character.subrace = newSubraceName;
    this.setState({
      character: character
    });
    localStorage.setItem("race", newRaceName);
    localStorage.setItem("subrace", newSubraceName);
  },
  render: function() {
    return <div className="character">
             <Editable name="Name" />
             <Editable name="Player" />
             <RaceSelect onChange={this.changeRace} race={this.state.character.race} subrace={this.state.character.subrace} />
             <AttributeList modifiers={this.state.character.getModifiers()}/>
           </div>;
  }
});

module.exports = CharacterSheet;
