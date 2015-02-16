var UserStore = {
  users: [],
  create: function(data) {
    data.id = Math.random().toString();
    this.users.push(data);
  },
  edit: function(data) {
    this.users.some(function(user, i) {
      if(user.id === data.id) return this.users[i] = data;
    }.bind(this));
    return this.users[data.id];
  }
}
