import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
//HASH USER PASSWORD
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// LOGIN
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          // 1️⃣ Nếu password trong DB là hash
          if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
            check = bcrypt.compareSync(password, user.password); // so sánh hash
          } else {
            // 2️⃣ Nếu password là plain text (test/dev)
            check = password === user.password;
          }

          if (check) {
            userData.errCode = "LOGIN_SUCCESS";
            userData.errMessage = "";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = "WRONG_PASSWORD";
            userData.errMessage = "Wrong password. Please try again!";
          }
        } else {
          userData.errCode = "USER_NOT_FOUND";
          userData.errMessage = "User not found!";
        }
      } else {
        userData.errCode = "EMAIL_NOT_EXIST";
        userData.errMessage = "Your email isn't exist in our system. Please try other email!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
// GET ALL USERS
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({});
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// CREATE NEW USER
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        return resolve({
          errCode: "1",
          errMessage: "Your email is already in used",
        });
      } else {
        let hashPasswordFromBcypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: "CREATE USER SUCCESSFULLY",
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// DELETE USER
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User not found!",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });

      resolve({
        errCode: 0,
        errMessage: "User deleted successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

// EDIT USER
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter: id",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;

        await user.save();

        resolve({
          errCode: 0,
          errMessage: "User updated successfully!",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
};
