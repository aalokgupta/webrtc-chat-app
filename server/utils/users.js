

class Users {
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.findUser(id);
    console.log(this.users);
    console.log(user, id);
    if(user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }
    return user;
  }

  findUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var userList = users.map(function(user) {
      return user.name;
    });
    return userList;
  }

  getCountOfUser() {
    console.log(this.users);
    return this.users.length;
  }
}

module.exports = {Users};
