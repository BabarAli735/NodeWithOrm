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
      paranoid: true,
      deletedAt: "softDelete",
    }
  );
  return ParanoidTable;
};
