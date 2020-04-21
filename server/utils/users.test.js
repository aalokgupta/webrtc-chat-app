var expect = require('expect');
var {Users} =  require('./users');

describe('Users', function() {
  var users;

  beforeEach(function() {
    users = new Users();
    users.users = [{id: 1,
                 name: 'aalok',
                 room: 'NodeJs Course'
               },
               { id: 2,
                 name: 'bittu',
                 room: 'CSS Course',
               },
               { id: 3,
                 name: 'Trilok',
                 room: 'NodeJs Course'
               }];
  });

  it('it should add a user to users class', function() {
    var user = {id: 'abcdef',
                name: 'aalok',
                room: 'NodeJs class'};
    var user = new Users();
    user.addUser(user.id, user.name, user.room);
    expect(user.users.length).toEqual(1);
  });

  it('should return list of users in a given room', () => {
      var userName = users.getUserList('NodeJs Course');
      expect(userName).toEqual(['aalok', 'Trilok']);
  });

  it('should return list of users in a given room', () => {
      var userName = users.getUserList('CSS Course');
      expect(userName).toEqual(['bittu']);
  });


  it('should return count of user from users array', () => {
      var userName = users.getCountOfUser();
      expect(userName).toBe(3);
  });

  it('should return return the index of given id from users list', () => {
      var user = users.findUser(3);
      expect(user.name).toEqual('Trilok');
  });

  it('should remove a user', () => {
      var userName = users.removeUser(2);
      expect(users.users.length).toBe(2);
  });


  // it('should return count of user from users array', () => {
  //   var userCount = users.getCountOfUser();
  //   expect(userCount).toBe(2);
  // });




});
