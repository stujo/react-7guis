var TemperatureConverter = React.createClass({displayName: "TemperatureConverter",
  render: function() {
    return (
      React.createElement("div", {className: "temperature-converter"}, 
        React.createElement("form", {onSubmit: this.convert}, 
          React.createElement("input", {ref: "fahrenheit", type: "text", name: "f", placeholder: "Fahrenheit"}), 
          React.createElement("input", {ref: "celsius", type: "text", name: "c", placeholder: "Celsius"}), 
          React.createElement("input", {type: "submit", value: "convert"})
        )
      )
    );
  },
  convert: function(e) {
    e.preventDefault();
    var fahrenheit = this.refs.fahrenheit.getDOMNode();
    var celsius = this.refs.celsius.getDOMNode();
    if(f = fahrenheit.value) {
      console.log(this.fToC(f));
    } else if(c = celsius.value) {
      console.log(this.cToF(c));
    } else {
      alert("You need to enter something");
    }
    fahrenheit.value = celsius.value = "";
  },
  cToF: function(c) {
    return c * (9/5) + 32
  },
  fToC: function(f) {
    return (f - 32) * (5/9)
  }
});

window.onload = function() {
  React.render(React.createElement(TemperatureConverter, null), document.body);
}
