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
  attributes: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
  render: function () {
    var modifiers = this.props.modifiers;
    var attributeNodes = this.attributes.map(function(attributeName) {
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
  races: ["Human", "Dwarf", "Elf", "Halfling", "Gnome", "Dragonborn", "Half Elf", "Half Orc", "Tiefling", "Aasimar"],
  getInitialState: function() {
    return {race: localStorage.getItem("race")}
  },
  update: function() {
    var newRace = this.refs.race.getDOMNode().value.trim();
    this.props.onChange(newRace);
  },
  render: function() {
    var options = this.races.map(function(race) {
      return (<option value={race} key={race}>{race}</option>);
    });
    return <p><select ref="race" onChange={this.update} value={localStorage.getItem("race")}>
             {options}
           </select></p>;
  }
});

var Character = React.createClass({
  getInitialState: function() {
    return { race: localStorage.getItem("race") || "Human" }
  },
  racialModifiers: {
    Human: {strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1},
    Dwarf: {constitution: 2},
    Halfling: {dexterity: 2},
    Elf: {dexterity: 2},
    Dragonborn: {strength: 2, charisma: 1},
    Gnome: {intelligence: 2},
    'Half Elf': {charisma: 2},
    'Half Orc': {strength: 2, constitution: 1},
    Tiefling: {charisma: 2, intelligence: 1},
    Aasimar: {charisma: 2, wisdom: 1}
  },
  changeRace: function(newRace) {
    this.setState({race: newRace});
    localStorage.setItem("race", newRace);
  },
  render: function() {
    return <div className="character">
             <Editable name="Name" />
             <Editable name="Player" />
             <RaceSelect onChange={this.changeRace} />
             <AttributeList modifiers={this.racialModifiers[this.state.race]}/>
           </div>;
  }
});

React.render(
  <Character />,
  document.getElementById("character")
);
