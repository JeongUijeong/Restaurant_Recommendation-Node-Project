module.exports = {
  userInsert: `insert into users (id, nickname, pw, salt) values(?,?,?,?)`,
  userSelectById: `select * from users where id=?`,
  userSelectByToken: `select * from users where token=?`,
  userUpdateById: `update users set ? where id=?`,
  userUpdateByToken: `update users set ? where token=?`,
  restaurantInsert: `insert into restaurants (r_Idx,r_name,image,address,tag,price,stars,parking,takeout) values (?,?,?,?,?,?,?,?,?)`,
  likeInsert: `insert into likes (u_Idx, r_Idx) values(?,?)`,
  likeDelete: `delete from likes where u_Idx = ? and r_Idx = ?`,
  restaurantSelect: `select * from restaurants`,
};
