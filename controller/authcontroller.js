// const Otp = require("../model/otp");
// const Fcm = require("../model/fcm");
const {Sequelize,Op, QueryTypes } = require("sequelize");
const db = require("../model");
const CatchAsync = require("../utils/catcAsync");
// const jwt = require("jsonwebtoken");
// const AppError = require("./../utills/appError");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
let Users = db.users;
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signUp = CatchAsync(async (req, res) => {
  let data = await Users.create({
    name: "Syed Mudasir",
    email:'test1ss@gmail.com',
    gender: "female",
  });
  res.status(201).json({
    status: "Success",
    token: "abcdefg",
    data: {
      user: data,
    },
  });
});

exports.signIn = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3 if everything is ok send token to clients
  const token = signToken(user._id);
  res.status(200).json({
    statuc: "success",
    user,
    token,
  });
});
exports.signOut = CatchAsync(async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  const user = await Fcm.findOne({ driverId: id });
  const deletFcm = await Fcm.findByIdAndDelete(user._id);
  console.log(deletFcm);
  res.status(200).json({
    status: "success",
    message: "Logout Successfully",
    user,
  });
});
exports.sendOpt = CatchAsync(async (req, res, next) => {
  // Create a transport object using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "babar.mobile.developer124@gmail.com",
      pass: "wudkknmcjjsrtybr",
    },
  });
  // Generate a random OTP
  // const otp = otpGenerator.generate(6, { digits: false, alphabets: false, upperCase: false, specialChars: false });
  const otp = Math.floor(Math.random() * 9000) + 1000;

  // Set up email data
  const mailOptions = {
    from: "babar.mobile.developer124@gmail.com",
    to: req.body.email,
    subject: "Your OTP for authentication",
    text: `Your OTP is ${otp}`,
  };
  // Send the email with the OTP
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      res.status(200).json({
        statuc: "Error",
        message: error,
      });
    } else {
      console.log("Email sent: " + info.response);
      const otpData = await Otp.create({
        email: req.body.email,
        Otp: otp,
      });
      res.status(200).json({
        statuc: "Success",
        message: "Otp sent to your Email",
      });
      setTimeout(async () => {
        const deleteOtp = await Otp.findByIdAndDelete(otpData._id);
        console.log("deleteOtp", deleteOtp);
      }, 500000);
    }
  });
});
exports.VarifyOtp = CatchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  const VarifyOtp = await Otp.findOne({ email });
  console.log(otp);
  if (otp == VarifyOtp.Otp) {
    res.status(200).json({
      statuc: "Success",
      message: "Email Varification Completed",
    });
  } else {
    next(new AppError("Invalid Otp", 401));
  }
});
exports.SaveFcm = CatchAsync(async (req, res, next) => {
  try {
    const driver = await Fcm.findOne({ driverId: req.body.driverId });
    if (driver?.driverId === req.body.driverId) {
      const updateOne = await Fcm.updateOne(
        { _id: req.body._id },
        {
          $set: { fcmToken: req.body.fcmToken },
        }
      );
      res.status(201).json({
        status: "Success",
        Fcm: updateOne,
      });
    } else {
      const fcm = await Fcm.create(req.body);
      res.status(201).json({
        status: "Success",
        Fcm: fcm,
      });
    }
  } catch (e) {
    console.log("SaveFcm error", e);
  }
});

exports.protect = CatchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
exports.getUser = CatchAsync(async (req, res, next) => {
  // const users = await Users.findAll({});
  // const users = await Users.findOne({});
  // const users = await Users.findAll({
  //   attributes:[
  //     'name',
  //     'email'
  //   ]
  // });
  // const users = await Users.findAll({
  //   attributes:[
  //     'name',
  //     ['email','EmailId'],
  //     'gender',
  //     [Sequelize.fn('COUNT', Sequelize.col('email'),'emailId')]
  //   ]
  // });
  // const users = await Users.findAll({
  //   where:{
  //   id:{
  //     // [Op.eq]:3
  //     [Op.gt]:1
  //   },
  //   email:{
  //  [Op.like]:'test@gmail.com'    
  //   },
  //   },
  //   order:[
  //     ['name','DESC']
  //   ]
  //   // limit:1,
  //   // offset:1

  // });
  // const users = await Users.findAndCountAll({});
  // const users = await db.sequelize.query('Select * from users',{
  //   type:QueryTypes.SELECT,
  //   model:Users,
  //   mapToModel:true
  // });
  // const qType='IN(:gender)'
  // const qType='LIKE :searchemail'
  const qType='= $gender'
  const users = await db.sequelize.query(`Select * from users where gender ${qType}`,{
    // type:QueryTypes.SELECT,
    // model:Users,
    // mapToModel:true
    // replacements:{gender:'male'}
    // replacements:['male']
    // replacements:{gender:['male','female']}
    // replacements:{searchemail:'%@gmail.com'}
    bind:{gender:'male'}
  })
  res.status(201).json({
    status: "Success",
    users,
  });
});
exports.updateUser = CatchAsync(async (req, res, next) => {
  const users = await Users.update(
    { name: "Zamin" },
    {
      where: {
        id: 2,
      },
    }
  );
  res.status(201).json({
    status: "Success",
    users,
  });
});
exports.deleteUser = CatchAsync(async (req, res, next) => {
  const users = await Users.destroy({
    where: {
      id: 2,
    },
  });
  res.status(201).json({
    status: "Success",
    users,
  });
});
