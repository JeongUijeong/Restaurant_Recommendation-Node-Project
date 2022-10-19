module.exports = {
  userSelectById: `select * from users where id=?`,
  userUpdateById: `update users set ? where id=?`,
  userUpdateByToken: `update users set ? where token=?`,
};
