var Crud = React.createClass({
  getInitialState: function() {
    return {
      users: UserStore.users,
      editing: false
    };
  },
  render: function() {
    return (
      <div className="crud">
        <UserForm handleSubmit={this.create} />
        {this.renderUsers()}
      </div>
    );
  },
  renderUsers: function() {
    var users = this.state.users.map(function(user) {
      var editing = this.state.editing === user ? true : false
      return(
        <User
          key={user.id}
          user={user}
          showEditForm={this.showEditForm}
          handleEdit={this.editUser}
          editing={editing} />
      )
    }.bind(this))
    return users;
  },
  create: function(data) {
    UserStore.create(data)
    this.setState({users: UserStore.users});
  },
  editUser: function(user) {
    UserStore.edit(user);
    this.setState({ users: UserStore.users });
  },
  showEditForm: function(user) {
    this.setState({ editing: user})
  }
});

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
    return this.props.selected ? "Update" : "Create";
  }
});

window.onload = function() {
  React.render(<Crud />, document.body);
}
