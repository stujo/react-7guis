var React = require('react');
var User = require('./user.jsx');
var UserForm = require('./user-form.jsx');
var SearchForm = require('./search-form.jsx');
var UserStore = require('../stores/user-store');

var Crud = React.createClass({
  getInitialState: function() {
    return {
      users: UserStore.users,
      editing: false
    };
  },
  componentDidMount: function() {
    UserStore.onChangeEvent(function() {
      this.setState({ users: UserStore.users });
    }.bind(this));
    UserStore.all();
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
module.exports = Crud;
