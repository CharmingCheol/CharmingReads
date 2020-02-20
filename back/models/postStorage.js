module.exports = (sequelize, DataTypes) => {
  const PostStorage = sequelize.define(
    "PostStorage",
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  PostStorage.associate = db => {
    db.PostStorage.belongsTo(db.Post);
    db.PostStorage.belongsTo(db.User);
  };
  return PostStorage;
};
