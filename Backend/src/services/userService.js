import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = {
  handleUserLogin,
};
