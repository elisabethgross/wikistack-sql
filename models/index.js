var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  }, {
    getterMethods: {
      route: function () { return '/wiki/' + this.urlTitle }
    }
});

// var Foo = sequelize.define('foo', {
//   firstname: Sequelize.STRING,
//   lastname: Sequelize.STRING
// }, {
//   getterMethods   : {
//     fullName       : function()  { return this.firstname + ' ' + this.lastname }
//   },

//   setterMethods   : {
//     fullName       : function(value) {
//         var names = value.split(' ');

//         this.setDataValue('firstname', names.slice(0, -1).join(' '));
//         this.setDataValue('lastname', names.slice(-1).join(' '));
//     },
//   }
// });

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

module.exports = {
  Page: Page,
  User: User
};
