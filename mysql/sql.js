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
  likeSelect: `select r_Idx from likes where u_Idx=?`,
  restaurantSelectByR_Idx: `select * from restaurants where r_Idx=?`,
  restaurantSelectBySearch: `select * from restaurants where tag like ? or r_name like ?`,
  c_sumSelectByR_Idx: `select count(r_Idx) as c_sum from comments where r_Idx=?`,
};
