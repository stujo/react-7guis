var Counter = React.createClass({
  getDefaultProps: function(){
     return {incrementBy: 1, startValue : 0}
  },
  getInitialState: function(){
    return { value: this.props.startValue };
  },
  render : function(){
    return(
<div>
<a href="#" onClick={this.increment}>click</a>
 <span>{this.state.value}</span>
<a href="#" onClick={this.resetValue}>reset</a>
</div>
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
    React.render(<Counter incrementBy={i + 1} />, divs[i]);
  };
}