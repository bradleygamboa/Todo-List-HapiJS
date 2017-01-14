'use strict';
module.exports = function(sequelize, DataTypes) {
  var TodoItem = sequelize.define('TodoItem', {
    task: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TodoItem;
};