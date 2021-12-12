
'use strict';

const bcryptjs =  require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type : DataTypes.STRING(20),
    },
    password: {
      type : DataTypes.STRING,
    },
    role: {
      type : DataTypes.STRING,
    },
    email: {
      type : DataTypes.STRING,
    },
    verified : {
      type : DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  });

  User.hook('beforeCreate' ,function(user) {
  
    /*if(user.isNew)
    {
     /*var salt = bcryptjs.genSaltSync(10);
      var hash = bcryptjs.hashSync(user.password, salt)
      console.log(hash);
      user.password=hash;    */
  
   user.password= bcryptjs.hashSync(user.password,bcryptjs.genSaltSync(10));
   
  }
  );
  
  User.comparePassword = function(pw,user) {
    
    
      console.log('yes');
      console.log(user.password);
      console.log(pw);
      /*bcryptjs.hash(pw, 10, function(err, hash) {
        console.log(hash);
        pw = hash;
       
      });*/
    var isMatch=bcryptjs.compare(pw, user.password);
    console.log(isMatch);
    return isMatch;
      
      
      
  }
  return User;
}

