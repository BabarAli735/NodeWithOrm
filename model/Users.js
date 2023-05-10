
module.exports=(sequelize,DataTypes)=>{
    const Users=sequelize.define('users',{
        name:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:DataTypes.STRING,
        gender:{
           type: DataTypes.STRING,
           validate: {
            // equals:{
            //     args:'male',
            //     msg:'Pleas Add male only'
            // }
            isIn:{
                args:[['male','female']],
                msg:'Please Enter male of female'
            }
          }
        }
    },{
        // timeStamp:false,
        // updatedAt:false,
        // createdAte:false,
        createdAt:'create_at',
        updatedAt:'modify_at',
        engin:'chroom'
    })
    return Users
}