var React = require('react');
var UserForm = require('./user-form.jsx');

var User = React.createClass({
  render: function() {
    return (
      this.props.editing ? this.renderForm() : this.renderUser()
    );
  },
  renderForm: function() {
    return(<UserForm handleSubmit={this.handleEdit} selected={this.props.user} />);
  },
  renderUser: function() {
    return(
      <li className="user">
        <a onDoubleClick={this.showEditForm}>{this.props.user.lastName}, {this.props.user.firstName}</a>
      </li>
    )
  },
  handleEdit: function(user) {
    this.props.handleEdit(user)
  },
  showEditForm: function() {
    this.props.showEditForm(this.props.user);
  }
});

module.exports = User;
