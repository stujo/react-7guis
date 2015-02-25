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
        <SearchForm handleSearch={this.search} />
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
  },
  search: function(term) {
    this.setState({users: UserStore.search(term)});
  },
  resetSearch: function() {
    this.setState({ users: UserStore.users });
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
    return this.props.selected.id ? "Update" : "Create";
  }
});

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

window.onload = function() {
  React.render(<Crud />, document.body);
}
