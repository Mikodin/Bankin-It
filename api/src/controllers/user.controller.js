var UserCtrl = function(User) {

  var UserObj = {};

  UserObj.AddUser = function(req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function(err, user) {
      if (err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, user: user});
    });
  };

  UserObj.GetUsers = function(req, res, next) {
    User.find(function(err, users) {
      if (err) {
        res.json({status: false, error: 'Something went wrong'});
        return;
      }
      res.json(users);
    });
  };

  UserObj.DeleteUser = function(req, res, next) {
    User.remove({_id: req.params.todo_id}, function(err, todos) {
      if (err) {
        res.json({status: false, error: 'Deleting user is not successfull'});
      }
      res.json({status: true, message: 'User deleted successfully'});
    });
  };

  return UserObj;
};

module.exports = UserCtrl;
