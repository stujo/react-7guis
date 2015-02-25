var TemperatureConverter = React.createClass({
  getInitialState: function() {
    return {
      converted: 0
    };
  },
  render: function() {
    return (
      <div className="temperature-converter">
        <form onSubmit={this.convert} >
          <input ref="fahrenheit" type="text" name="f" placeholder="Fahrenheit" />
          <input ref="celsius" type="text" name="c" placeholder="Celsius" />
          <input type="submit" value="convert" />
        </form>
        <div>{this.state.converted}</div>
      </div>
    );
  },
  convert: function(e) {
    e.preventDefault();
    var fahrenheit = this.refs.fahrenheit.getDOMNode();
    var celsius = this.refs.celsius.getDOMNode();
    var converted;
    if(f = fahrenheit.value) {
      converted = Math.floor(this.fToC(f));
      this.setState({ converted: converted+" C" })
    } else if(c = celsius.value) {
      converted = Math.floor(this.cToF(c));
      this.setState({ converted: converted+" F" })
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
  React.render(<TemperatureConverter />, document.body);
}
