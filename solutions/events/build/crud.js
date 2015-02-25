var Crud = React.createClass({displayName: "Crud",
  getInitialState: function() {
    return {
      users: UserStore.users,
      editing: false
    };
  },
  componentDidMount: function() {
    UserStore.onChangeEvent(function() {
      this.setState({ users: UserStore.users });
    }.bind(this))
  },
  render: function() {
    return (
      React.createElement("div", {className: "crud"}, 
        React.createElement(SearchForm, {handleSearch: this.search}), 
        React.createElement(UserForm, {handleSubmit: this.create}), 
        this.renderUsers()
      )
    );
  },
  renderUsers: function() {
    var users = this.state.users.map(function(user) {
      var editing = this.state.editing === user ? true : false
      return(
        React.createElement(User, {
          key: user.id, 
          user: user, 
          showEditForm: this.showEditForm, 
          handleEdit: this.editUser, 
          editing: editing})
      )
    }.bind(this))
    return users;
  },
  create: function(data) {
    UserStore.create(data)
  },
  editUser: function(user) {
    UserStore.edit(user);
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

var User = React.createClass({displayName: "User",
  render: function() {
    return (
      this.props.editing ? this.renderForm() : this.renderUser()
    );
  },
  renderForm: function() {
    return(React.createElement(UserForm, {handleSubmit: this.handleEdit, selected: this.props.user}));
  },
  renderUser: function() {
    return(
      React.createElement("li", {className: "user"}, 
        React.createElement("a", {onDoubleClick: this.showEditForm}, this.props.user.lastName, ", ", this.props.user.firstName)
      )
    )
  },
  handleEdit: function(user) {
    this.props.handleEdit(user)
  },
  showEditForm: function() {
    this.props.showEditForm(this.props.user);
  }
});

var UserForm = React.createClass({displayName: "UserForm",
  getDefaultProps: function() {
    return {
      selected: {}
    };
  },
  render: function() {
    return (
      React.createElement("div", {className: "user-form"}, 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {ref: "id", type: "hidden", value: this.props.selected.id}), 
          React.createElement("input", {ref: "firstName", type: "text", defaultValue: this.props.selected.firstName}), 
          React.createElement("input", {ref: "lastName", type: "text", defaultValue: this.props.selected.lastName}), 
          React.createElement("input", {type: "submit", value: this.submitValue()})
        )
      )
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

var SearchForm = React.createClass({displayName: "SearchForm",
  render: function() {
    return (
      React.createElement("div", {className: "search-form"}, 
        React.createElement("input", {ref: "name", type: "text", placeholder: "Search", onKeyUp: this.search}), 
        React.createElement("a", {href: "#", onClick: this.clear}, " clear")
      )
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
  React.render(React.createElement(Crud, null), document.body);
}
