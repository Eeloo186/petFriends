const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
        userId: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        nickname: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        provider: {
            type: Sequelize.ENUM('local', 'kakao'),
            allowNull: false,
        },
        snsId: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        pet: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        rank: {
            type: Sequelize.STRING(5),      // 추후 ENUM으로 변경
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Pet);
    db.User.hasMany(db.Like);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};

module.exports = User;
