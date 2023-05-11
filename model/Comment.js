
module.exports=(sequelize,DataTypes)=>{
    const Comments=sequelize.define('comments',{
        title:DataTypes.STRING,
        commentableType:DataTypes.STRING,
        commentableId:DataTypes.INTEGER,
    },{
        // timeStamp:false,
        // updatedAt:false,
        // createdAte:false,
        createdAt:'create_at',
        updatedAt:'modify_at',
        engin:'chroom'
    })
    return Comments
}