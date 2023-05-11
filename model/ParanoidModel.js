module.exports = (sequelize, DataTypes) => {
  const ParanoidTable = sequelize.define(
    "ParanoidTable",
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
    //   paranoid: true,

      // If you want to give a custom name to the deletedAt column
      deletedAt: "destroyTime",
    }
  );
  return ParanoidTable;
};
