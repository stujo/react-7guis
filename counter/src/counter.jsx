var Counter = React.createClass({
  getInitialState: function() {
    return {
      counter: this.props.start
    };
  },
  render: function() {
    return (
      <div className="counter">
        <span>{this.state.counter} </span>
        <a href="#" onClick={this.count}>count | </a>
        <a href="#" onClick={this.reset}>reset</a>
      </div>
    );
  },
  count: function() {
    this.setState({ counter: ++this.state.counter });
  },
  reset: function() {
    this.setState({ counter: this.props.start });
  }
});

window.onload = function() {
  React.render(<Counter start={0} />, document.body);
}
