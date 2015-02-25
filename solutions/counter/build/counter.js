var Counter = React.createClass({displayName: "Counter",
  getInitialState: function() {
    return {
      counter: this.props.start
    };
  },
  render: function() {
    return (
      React.createElement("div", {className: "counter"}, 
        React.createElement("span", null, this.state.counter, " "), 
        React.createElement("a", {href: "#", onClick: this.count}, "count | "), 
        React.createElement("a", {href: "#", onClick: this.reset}, "reset")
      )
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
  React.render(React.createElement(Counter, {start: 0}), document.body);
}
