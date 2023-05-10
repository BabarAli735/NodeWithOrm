
module.exports=(sequelize,DataTypes)=>{
    const Tags=sequelize.define('Tags',{
        name:DataTypes.STRING,
    },{
        // timeStamp:false,
        // updatedAt:false,
        // createdAte:false,
        createdAt:'create_at',
        updatedAt:'modify_at',
        // engin:'chroom'
    })
    return Tags
}