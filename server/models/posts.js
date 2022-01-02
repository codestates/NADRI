'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      address: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'posts',
    }
  );
  return posts;
};
