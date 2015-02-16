var TemperatureConverter = React.createClass({
  render: function() {
    return (
      <div className="temperature-converter">
        <form onSubmit={this.convert} >
          <input ref="fahrenheit" type="text" name="f" placeholder="Fahrenheit" />
          <input ref="celsius" type="text" name="c" placeholder="Celsius" />
          <input type="submit" value="convert" />
        </form>
      </div>
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
  React.render(<TemperatureConverter />, document.body);
}
