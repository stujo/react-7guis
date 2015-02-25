var UserStore = {
  CHANGE_EVENT: 'change',
  users: [],
  create: function(data) {
    data.id = Math.random().toString();
    this.users.push(data);
    this.triggerChange();
  },
  edit: function(data) {
    this.users.some(function(user, i) {
      if(user.id === data.id) return this.users[i] = data;
    }.bind(this));
    this.triggerChange();
  },
  search: function(term) {
    return this.users.filter(function(user) {
      return user.firstName.indexOf(term) > -1 || user.lastName.indexOf(term) > -1
    })
  },
  triggerChange: function(data) {
    $(this).trigger(this.CHANGE_EVENT, data);
  },
  onChangeEvent: function(callback) {
    $(this).on(this.CHANGE_EVENT, callback);
  }
}
