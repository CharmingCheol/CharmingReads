module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      src: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.PostStorage);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, {
      through: "PostLike",
      as: "Like"
    });
  };
  return Post;
};
