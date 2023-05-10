const db = require("../model");
const CatchAsync = require("../utils/catcAsync");
let Users = db.users;
let Post = db.posts;
let PostTags = db.post_tag;
let Tags = db.tags;
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
