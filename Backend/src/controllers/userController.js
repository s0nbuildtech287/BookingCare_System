import userService from "../services/userService";

// LOGIN
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
// GET ALL USERS
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

// CREATE NEW USER
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

// EDIT USER
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

// DELETE USER
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter: id",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
};
