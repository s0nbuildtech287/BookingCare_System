import bcrypt from "bcryptjs";

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  hashUserPassword,
};
