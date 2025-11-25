import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //   validation
  if (!email || !password) {
    return res.status(500).json({
      errCode: "MISSING _INPUTS",
      errMessage: "Missing inputs parameter!",
    });
  }
  //   take user info
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin,
};
