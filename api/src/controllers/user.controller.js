var UserCtrl = function(User) {

  var UserObj = {};

  UserObj.PostUser = function(req, res, next) {
    var newUser = new User(req.body);

    newUser.save(function(err, user) {
      if (err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, user: user});
    });
  };

  UserObj.GetUser = function(req, res, next) {
    User.find(function(err, users) {
      if (err) {
        res.json({status: false, error: 'Something went wrong'});
        return;
      }
      res.json({status: true, user: users});
    });
  };

  return UserObj;
};

module.exports = UserCtrl;
