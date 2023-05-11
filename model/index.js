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
db.comments=require("./Comment")(sequelize, DataTypes);
db.image=require("./Image")(sequelize, DataTypes);
db.video=require("./Video")(sequelize, DataTypes);
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

db.image.hasMany(db.comments, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'image'
  }
});
db.video.hasMany(db.comments,{
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'video'
  }
})
db.comments.belongsTo(db.image, { 
	foreignKey: 'commentableId', 
	constraints: false 
});
db.comments.belongsTo(db.video, { 
	foreignKey: 'commentableId', 
	constraints: false 
});
//This Hook is used to delete Image and Video model in Comments
db.comments.addHook("afterFind", findResult => {
  if (!Array.isArray(findResult)) findResult = [findResult];
  for (const instance of findResult) {
    if (instance.commentableType === "image" && instance.image !== undefined) {
      instance.commentable = instance.image;
    } else if (instance.commentableType === "video" && instance.video !== undefined) {
      instance.commentable = instance.video;
    }
    // To prevent mistakes:
    delete instance.image;
    delete instance.dataValues.image;
    delete instance.video;
    delete instance.dataValues.video;
  }
});

db.users.hasMany(db.posts);
db.posts.belongsTo(db.users.scope('checkStatus'));

// many TO May

db.posts.belongsToMany(db.tags, { through: db.post_tags });
db.tags.belongsToMany(db.posts, { through: db.post_tags });


db.sequelize.sync({ force: false }).then((res) => {
  console.log("sync====");
});
module.exports = db;
