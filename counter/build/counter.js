var Counter = React.createClass({displayName: "Counter",
  render : function(){
    return(
React.createElement("div", {className: "counter"}, 
React.createElement("a", {href: "#", onClick: this.handleClick}, "click"), 
 React.createElement("span", null, "0")
)
      );
  },
  handleClick : function(e){
    e.preventDefault();
    console.log(e);
  }
});

window.onload = function(){
  React.render(React.createElement(Counter, null), document.body);
}