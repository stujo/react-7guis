var Counter = React.createClass({
  render : function(){
    return(
<div className="counter">
<a href="#" onClick={this.handleClick}>click</a>
 <span>0</span>
</div>
      );
  },
  handleClick : function(e){
    e.preventDefault();
    console.log(e);
  }
});

window.onload = function(){
  React.render(<Counter />, document.body);
}