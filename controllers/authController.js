const register = (req, res) => {
  res.send('register');
}

const login = (req, res) => {
  res.send("login")
}

const revoke = (req, res) => {
  res.send("revoke")
}

const me = (req, res) => {
  res.send("me")
}

module.exports = { register, login, revoke, me }