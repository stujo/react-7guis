var TemperatureConverter = React.createClass({displayName: "TemperatureConverter",
  getInitialState: function() {
    return {
      converted: 0
    };
  },
  render: function() {
    return (
      React.createElement("div", {className: "temperature-converter"}, 
        React.createElement("form", {onSubmit: this.convert}, 
          React.createElement("input", {ref: "fahrenheit", type: "text", name: "f", placeholder: "Fahrenheit"}), 
          React.createElement("input", {ref: "celsius", type: "text", name: "c", placeholder: "Celsius"}), 
          React.createElement("input", {type: "submit", value: "convert"})
        ), 
        React.createElement("div", null, this.state.converted)
      )
    );
  },
  convert: function(e) {
    e.preventDefault();
    var fahrenheit = this.refs.fahrenheit.getDOMNode();
    var celsius = this.refs.celsius.getDOMNode();
    if(f = fahrenheit.value) {
      this.setState({ converted: this.fToC(f)+" C" })
    } else if(c = celsius.value) {
      this.setState({ converted: this.cToF(c)+" F" })
    } else {
      alert("You need to enter something");
    }
    fahrenheit.value = celsius.value = "";
  },
  cToF: function(c) {
    return Math.floor(c * (9/5) + 32)
  },
  fToC: function(f) {
    return Math.floor((f - 32) * (5/9));
  }
});

window.onload = function() {
  React.render(React.createElement(TemperatureConverter, null), document.body);
}
