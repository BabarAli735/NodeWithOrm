const db = require("../model");
const CatchAsync = require("../utils/catcAsync");
let Users = db.users;
let Post = db.posts;
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
