const {Sequelize,DataTypes} = require("sequelize");

const sequelize = new Sequelize(
  "eataway",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging:true,//for Showing Queries
    pool: { max: 5, min: 0, idl: 10000 },
  }
);

sequelize.authenticate().then(() => {
    console.log('====================================');
    console.log('Connected');
    console.log('====================================');
});

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize;

db.users=require('./Users')(sequelize,DataTypes)
db.sequelize.sync({force:false}).then(res=>{
  console.log('sync====');
})
module.exports=db;