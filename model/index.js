const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "eataway",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: true, //for Showing Queries
    pool: { max: 5, min: 0, idl: 10000 },
  }
);

sequelize.authenticate().then(() => {
  console.log("====================================");
  console.log("Connected");
  console.log("====================================");
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//--------Scops-----------//


db.users = require("./Users")(sequelize, DataTypes);
db.posts = require("./Post")(sequelize, DataTypes);
db.tags = require("./Tags")(sequelize, DataTypes);
db.post_tags = require("./PostTags")(sequelize, DataTypes, db.posts, db.tags);

db.users.addScope('checkStatus',{
  where:{
    status:1,
    gender:'male'
  }
})
db.users.addScope('checkGender',{
  where:{
    gender:'male'
  }
})  
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users.scope('checkStatus'));

// many TO May

db.posts.belongsToMany(db.tags, { through: db.post_tags });
db.tags.belongsToMany(db.posts, { through: db.post_tags });


db.sequelize.sync({ force: false }).then((res) => {
  console.log("sync====");
});
module.exports = db;
