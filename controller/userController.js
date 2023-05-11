const db = require("../model");
const CatchAsync = require("../utils/catcAsync");
let Users = db.users;
let Post = db.posts;
let PostTags = db.post_tags;
let Tags = db.tags;
let Comments=db.comments
let Image=db.image
let Video=db.video
let ParanoidTable=db.paranoidTable
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
    data
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

  const videoData=await Video.findAll({
    include:[Comments]
  })
  // const imageData=await Image.findAll({
  //   include:[Comments]
  // })
  res.status(201).json({
    status: "Success",
    videoData
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
  let Data=await Tags.findAll({
    include:[Video]
  })
  res.status(201).json({
    status: "Success",
    Data:Data
  });
});
exports.DeleteParanoidTableData = CatchAsync(async (req, res, next) => {
  const comments = await ParanoidTable.destroy({
    where: {
      id: 1
    }
  });

  res.status(201).json({
    status: "Success",
    comments
  });
});
exports.loading = CatchAsync(async (req, res, next) => {
//--------LazyLoading--------//
  // let UsersData=await Users.findOne({
  //   where:{id:2}
  // })
  // let postData=await UsersData.getPosts()

//--------EagerLoading--------//
let UsersData=await Users.findOne({
  include:[{
    required:true,
    model:Post
  }],
  where:{id:2}
})
let postData=await UsersData.getPosts()
  res.status(201).json({
    status: "Success",
    UsersData,
    postData
  });
});
