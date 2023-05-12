const { Sequelize, DataTypes } = require("sequelize");
const db = require("../model");
const CatchAsync = require("../utils/catcAsync");
let Users = db.users;
let Post = db.posts;
let PostTags = db.post_tags;
let Tags = db.tags;
let Comments = db.comments;
let Image = db.image;
let Video = db.video;
let ParanoidTable = db.paranoidTable;
exports.createPost = CatchAsync(async (req, res, next) => {
  let data = await Post.create({
    name: "New Post",
    title: "My Post",
    content: "Test 1 ",
    userId: 2,
  });
  res.status(201).json({
    status: "Success",
    token: "abcdefg",
    data: {
      user: data,
    },
  });
});
exports.oneToone = CatchAsync(async (req, res, next) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Post,
        as: "postDetail",
        attributes: [["name", "PostName"], "title"],
      },
    ],
    where: { id: 7 },
  });
  res.status(201).json({
    status: "Success",
    data,
  });
});
exports.oneToMany = CatchAsync(async (req, res, next) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Post,
        attributes: [["name", "PostName"], "title"],
      },
    ],
    where: { id: 2 },
  });
  res.status(201).json({
    status: "Success",
    data,
  });
});
exports.manyToMany = CatchAsync(async (req, res, next) => {
  let data = await Tags.findAll({
    include: {
      attributes: ["name", "title"],
      model: Post,
    },
  });
  res.status(201).json({
    status: "Success",
    data,
  });
});
exports.oneBelongTo = CatchAsync(async (req, res, next) => {
  let data = await Post.findAll({
    include: [
      {
        model: Users,
      },
    ],
  });
  res.status(201).json({
    status: "Success",
    data,
  });
});
exports.CheckActiveUserScope = CatchAsync(async (req, res, next) => {
  let data = await Post.findAll({});
  res.status(201).json({
    status: "Success",
    data,
  });
});
exports.Polymorphic = CatchAsync(async (req, res, next) => {
  // const comments = await Comments.findAll({
  //   include: [Image, Video],
  // });
  // for (const comment of comments) {
  //   const message = `Found comment #${comment.id} with ${comment.commentableType} commentable:`;
  //   console.log(message, comment.commentable.toJSON());
  // }

  const videoData = await Video.findAll({
    include: [Comments],
  });
  // const imageData=await Image.findAll({
  //   include:[Comments]
  // })
  res.status(201).json({
    status: "Success",
    videoData,
  });
});
exports.PolymorphicMany = CatchAsync(async (req, res, next) => {
  // Image to Tag -------
  // let Data=await Image.findAll({
  //   include:[Tags]
  // })
  // Video to Tag -------
  // let Data=await Video.findAll({
  //   include:[Tags]
  // })
  // Tag to Image -------
  // let Data=await Tags.findAll({
  //   include:[Image]
  // })
  // Tag to Video -------
  let Data = await Tags.findAll({
    include: [Video],
  });
  res.status(201).json({
    status: "Success",
    Data: Data,
  });
});
exports.DeleteParanoidTableData = CatchAsync(async (req, res, next) => {
  const comments = await ParanoidTable.findAll({});
  // const comments = await ParanoidTable.destroy({
  //   where:{
  //     id:1
  //   }
  // });

  //-----get deleted Data
  // const comments = await ParanoidTable.findAll({
  //   paranoid:false
  // });
  //-----Restore ----- ///
  // const comments = await ParanoidTable.restore({
  //   where:{
  //     id:1
  //   }
  // });
  res.status(201).json({
    status: "Success",
    comments,
  });
});
exports.loading = CatchAsync(async (req, res, next) => {
  //--------LazyLoading--------//
  // let UsersData=await Users.findOne({
  //   where:{id:2}
  // })
  // let postData=await UsersData.getPosts()

  //--------EagerLoading--------//
  let UsersData = await Users.findOne({
    include: [
      {
        required: true,
        model: Post,
      },
    ],
    where: { id: 2 },
  });
  let postData = await UsersData.getPosts();
  res.status(201).json({
    status: "Success",
    UsersData,
    postData,
  });
});
exports.Transaction = CatchAsync(async (req, res, next) => {
  let t = await db.sequelize.transaction();

  try {
    // const user =await Users.create(
    //   {
    //     name: "Test1",
    //     email: "Test2@yopmail.com",
    //     password: "abcdefg",
    //     gender: "male",
    //   },
    //   {
    //     transaction: t,
    //   }
    // );
    const user = await Users.findAll({
      transaction: t,
      lock: true,
    });
    console.log("====================================");
    console.log("COmmit");
    console.log("====================================");
    t.commit();
    res.status(201).json({
      status: "Success",
      Transaction: "Transaction Success",
      user,
    });
  } catch (e) {
    t.rollback();
    console.log("====================================");
    console.log("rollback");
    console.log("====================================");
    res.status(404).json({
      status: "SFail",
      Transaction: "Transaction fail",
    });
  }
});
exports.Hooks = CatchAsync(async (req, res, next) => {
  const user = await Users.create({
    name: "Test1",
    email: "Test2456789@yopmail.com",
    password: "abcdefg",
    gender: "male",
  });
  res.status(202).json({
    status: "Success",
    Hooks: "Hooks",
    user,
  });
});

const QuaeryIntrface = db.sequelize.getQueryInterface();
exports.QueryInterface = CatchAsync(async (req, res, next) => {
  // let data=await QuaeryIntrface.createTable('avon',{
  //   name:DataTypes.STRING
  // });

  //=======Add Column======//

  // let data = await QuaeryIntrface.addColumn("avon", "email", {
  //   type: DataTypes.STRING,
  // });
  //=======Alter======//

  // let data = await QuaeryIntrface.changeColumn(
  //   "avon",
  //   "email",
  //   {
  //     type: DataTypes.TEXT,
  //   }
  // );
  //=======Remove column ======//

  // let data = await QuaeryIntrface.removeColumn("avon", "email");
  
  //=======Remove Table  ======//

  let data = await QuaeryIntrface.dropTable("avon");
  res.status(202).json({
    status: "Success",
    QueryInterface: "QueryInterface",
    data,
  });
});
