var ruleset = require('../ruleset.js');
var React = require('react/addons');
var _ = require('lodash');

var Attribute = React.createClass({
  calculateModifier: function (value) {
    var mod = Math.floor((value - 10) / 2);
    return (mod > 0 ? "+" + mod : mod.toString());
  },
  getInitialState: function () {
    return { value: parseInt(localStorage.getItem(this.props.name.toLowerCase()) || 10) };
  },
  total: function() {
    return this.components().reduce(function(acc, curr) { return acc + curr; });
  },
  components: function() {
    var parts = [this.state.value];
    if (this.props.modifier !== undefined) { parts.push(this.props.modifier) };
    return parts;
  },
  updateAttribute: function () {
    var newValue = parseInt(this.refs.value.getDOMNode().value.trim());
    localStorage.setItem(this.props.name.toLowerCase(), newValue);
    this.setState({value: newValue});
  },
  render: function () {
    var cx = React.addons.classSet;
    var classes = cx({
      'total': true,
      'modified': this.props.modifier !== undefined
    });
    return <tr className="attribute">
             <td><label htmlFor={this.props.name.toLowerCase()}>{this.props.name}</label></td>
             <td><input
               id={this.props.name.toLowerCase()}
               className="base"
               value={this.state.value}
               onChange={this.updateAttribute}
               ref="value"
               title={this.components().join(" + ")}
             /></td>
             <td><span className={classes}>{this.total()}</span></td>
             <td><span className="modifier">{this.calculateModifier(this.total())}</span></td>
           </tr>;
  }
});

var AttributeList = React.createClass({
  render: function () {
    var modifiers = this.props.modifiers;
    var attributeNodes = ruleset.attributes.map(function(attributeName) {
      var mod = modifiers[attributeName.toLowerCase()];
      return (<Attribute modifier={mod} name={attributeName} key={attributeName} />);
    });
    return <table className="attributes">
             <thead>
               <tr><th>Attribute</th><th>Base</th><th>Total</th><th>Mod</th></tr>
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

var Character = React.createClass({
  getInitialState: function() {
    var race = ruleset.getRace(localStorage.getItem("race"));
    window.rs = ruleset;
    console.log(ruleset);
    return {
      race: race,
      subrace: race.getSubrace(localStorage.getItem("subrace")),
    }
  },
  changeRace: function(newRaceName, newSubraceName) {
    var race = ruleset.getRace(newRaceName)
    this.setState({
      race: race,
      subrace: race.getSubrace(newSubraceName),
    });
    localStorage.setItem("race", newRaceName);
    localStorage.setItem("subrace", newSubraceName);
  },
  render: function() {
    return <div className="character">
             <Editable name="Name" />
             <Editable name="Player" />
             <RaceSelect onChange={this.changeRace} race={this.state.race} subrace={this.state.subrace.name} />
             <AttributeList modifiers={this.state.race.getModifiers(this.state.subrace.name)}/>
           </div>;
  }
});

React.render(
  <Character />,
  document.getElementById("character")
);
