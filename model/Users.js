module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        validate: {
          // equals:{
          //     args:'male',
          //     msg:'Pleas Add male only'
          // }
          isIn: {
            args: [["male", "female"]],
            msg: "Please Enter male of female",
          },
        },
      },
    },
    {
      // timeStamp:false,
      // updatedAt:false,
      // createdAte:false,
      createdAt: "create_at",
      updatedAt: "modify_at",
      hooks: {
        // beforeValidate:(user,option)=>{
        //     console.log('user===',user);
        //     console.log('option===',option);
        //     console.log('Before Valiate hook Called');
        //     user.name='Dummy Name'
        // },
        // afterValidate:(user,option)=>{
        //     console.log('afterValidate Valiate hook Called');
        //     user.name='Babar'
        // }
      },
    }
  );

  Users.addHook("beforeValidate", "CustomName", (user, option) => {
    console.log("Before Valiate hook Called");
    user.name = "Dummy Name";
  });
  Users.afterValidate("MyHook", (user, option) => {
    console.log("afterValidate Valiate hook Called");
    // user.name = "New Hook after";
    //remove hook
    Users.removeHook("beforeValidate", "CustomName");
  });
  return Users;
};
