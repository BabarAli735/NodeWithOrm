
module.exports=(sequelize,DataTypes)=>{
    const Posts=sequelize.define('posts',{
        name:DataTypes.STRING,
        title:DataTypes.STRING,
        content:DataTypes.STRING,
       userId:DataTypes.INTEGER,
    },{
        // timeStamp:false,
        // updatedAt:false,
        // createdAte:false,
        createdAt:'create_at',
        updatedAt:'modify_at',
        engin:'chroom'
    })
    return Posts
}