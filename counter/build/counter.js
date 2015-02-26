var Counter = React.createClass({displayName: "Counter",
  getDefaultProps: function(){
     return {incrementBy: 1, startValue : 0}
  },
  getInitialState: function(){
    return { value: this.props.startValue };
  },
  render : function(){
    return(
React.createElement("div", null, 
React.createElement("a", {href: "#", onClick: this.increment}, "click"), 
 React.createElement("span", null, this.state.value), 
React.createElement("a", {href: "#", onClick: this.resetValue}, "reset")
)
      );
  },
  increment : function(e){
    e.preventDefault();
    this.setState( { value: this.state.value + this.props.incrementBy } )
  },
  resetValue : function(e){
    e.preventDefault();
    this.setState( { value: this.props.startValue } )
  }
});

window.onload = function(){
  var divs = document.querySelectorAll('.counter');
  for (var i = divs.length - 1; i >= 0; i--) {
    React.render(React.createElement(Counter, {incrementBy: i + 1}), divs[i]);
  };
}