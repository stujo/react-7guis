var UserStore = {
  fb: new Firebase('https://backbonereact.firebaseio.com/users'),
  CHANGE_EVENT: 'change',
  users: [],
  all: function() {
    this.fb.once('value', function(snapshot) {
      if(users = snapshot.val()) {
        this.users = Object.keys(users).map(function(key){ return users[key]});
        this.triggerChange();
      }
    }.bind(this));
  },
  create: function(data) {
    data.id = this.guid();
    var dataByKey = {}
    dataByKey[data.id]  = data;
    this.fb.update(dataByKey, function(error) {
      if (error) {
        console.log(error);
      } else {
        this.users.push(data);
        this.triggerChange();
      }
    }.bind(this));
  },
  edit: function(data) {
    this.fb.child(data.id).update(data, function(error) {
      if (error) {
        console.log(error);
      } else {
        this.users.some(function(user, i) {
          if(user.id === data.id) return this.users[i] = data;
        }.bind(this));
        this.triggerChange();
      }
    }.bind(this));
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
  },
  guid: function() {
    function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
