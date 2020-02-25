module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      nickName: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      src: {
        type: DataTypes.TEXT
      },
      introduction: {
        type: DataTypes.TEXT
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.PostStorage);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "PostLike", as: "Like" });
    db.User.belongsToMany(db.User, { through: "UserFollow", as: "Follow" });
    db.User.belongsToMany(db.User, {
      through: "UserFollowing",
      as: "Following"
    });
  };
  return User;
};
