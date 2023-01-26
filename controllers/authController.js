const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require("../models/index");

const getUser = async (username) => {
  const user = await model.users.findOne({
    where: {
      username: username
    }
  });
  return user;
}

const cookieJwtAuth = (req, res) => {
  console.log(req.headers)
  const token = req.headers.authorization;
  console.log(token)
  console.log('CheckToken Active')
  if(!token){
    return res.json({tokenStatus: false}).status(200);
  }else{
    return res.json({tokenStatus: true}).status(200);
  }
}

const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, password) => {
    if(err){
      return res.send("Gagal Menambahkan Data User").status(400);
    }
    if(password){
      await model.users.create({name, username, email, password});
      return res.send("Berhasil Menambahkan Data User").status(200);
    }
  });
}

const login = async (req, res) => {
  const { username, password } = req.body;
  let user = await getUser(username);

  if(!user){
    return res.status(403).json({
      message: 'Username not Found',
      error: "invalid login",
    })
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if(err) throw err;
    if(!result){
      return res.status(403).json({
        message: 'Wrong Password',
        error: "invalid login",
      });
    }
  })

  const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, { expiresIn: "1h" });

  return res.json({token: token}).status(200);
}

const revoke = (req, res) => {
  return res.status(204).end();
}

const me = async (req, res) => {
  return res.json("me");
}

module.exports = { register, login, revoke, me, cookieJwtAuth }