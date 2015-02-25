var React = require('react');

var UserForm = React.createClass({
  getDefaultProps: function() {
    return {
      selected: {}
    };
  },
  render: function() {
    return (
      <div className="user-form">
        <form onSubmit={this.handleSubmit}>
          <input ref="id" type="hidden" value={this.props.selected.id} />
          <input ref="firstName" type="text" defaultValue={this.props.selected.firstName} />
          <input ref="lastName" type="text" defaultValue={this.props.selected.lastName} />
          <input type="submit" value={this.submitValue()} />
        </form>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.id.getDOMNode();
    var firstName = this.refs.firstName.getDOMNode();
    var lastName = this.refs.lastName.getDOMNode();
    this.props.handleSubmit({id: id.value, firstName: firstName.value, lastName: lastName.value});
    firstName.value = lastName.value = '';
  },
  submitValue: function() {
    return this.props.selected.id ? "Update" : "Create";
  }
});

module.exports = UserForm;
