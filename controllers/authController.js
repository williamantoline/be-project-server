const conn = require("../db");

const getUser = async (username) => {
  conn.query(`SELECT * FROM users WHERE username='${username}'`, (err, result) => {
    if(err) return false
    return result
  })
}

const register = (req, res) => {
  res.send('register');
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if(!user){
    return res.status(403).json({
      message: 'Username not Found',
      error: "invalid login",
    })
  }

  if(user.password !== password){
    return res.status(403).json({
      message: 'Wrong Password',
      error: "invalid login",
    });
  }

  const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
  })

  return res.redirect("/home");

}

const revoke = (req, res) => {
  res.send("revoke")
}

const me = (req, res) => {
  res.send("me")
}

module.exports = { register, login, revoke, me }