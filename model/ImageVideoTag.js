
module.exports=(sequelize,DataTypes)=>{
    const ImageVideoTag=sequelize.define('ImageVideoTag',{
        tagId:{
            type:DataTypes.INTEGER,
            unique:'tt_unique_contstraint'
        },
        tagableId:{
            type:DataTypes.INTEGER,
            unique:'tt_unique_contstraint'
        },
        tagableType:{
            type:DataTypes.STRING,
            unique:'tt_unique_contstraint'
        },
        name:DataTypes.STRING,
    },{
        createdAt:'create_at',
        updatedAt:'modify_at',
    })
    return ImageVideoTag
}