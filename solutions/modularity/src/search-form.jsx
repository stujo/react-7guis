var React = require('react');
var SearchForm = React.createClass({
  render: function() {
    return (
      <div className="search-form">
        <input ref="name" type="text" placeholder="Search" onKeyUp={this.search} />
        <a href="#" onClick={this.clear}> clear</a>
      </div>
    );
  },
  search: function(e) {
    e.preventDefault();
    var searchTerm = this.refs.name.getDOMNode().value;
    this.props.handleSearch(searchTerm);
  },
  clear: function(e) {
    e.preventDefault();
    this.refs.name.getDOMNode().value = "";
    this.search(e)
  }

});

module.exports = SearchForm;
