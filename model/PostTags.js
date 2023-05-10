module.exports = (sequelize, DataTypes,Post,Tags) => {
  const PostTags = sequelize.define(
    "post_tags",
    {
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: Tags, // 'Movies' would also work
          key: "id",
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: Post, // 'Movies' would also work
          key: "id",
        },
      },
    },
    {
      // timeStamp:false,
      // updatedAt:false,
      // createdAte:false,
      createdAt: "create_at",
      updatedAt: "modify_at",
      // engin:'chroom'
    }
  );
  return PostTags;
};
