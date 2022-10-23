module.exports = {
  userInsert: `insert into users (id, nickname, pw, salt) values(?,?,?,?)`,
  userSelectByU_Idx: `select * from users where u_Idx=?`,
  userSelectByToken: `select * from users where token=?`,
  userUpdateById: `update users set ? where id=?`,
  userUpdateByToken: `update users set ? where token=?`,

  likeInsert: `insert into likes (u_Idx, r_Idx) values(?,?)`,
  likeDelete: `delete from likes where u_Idx = ? and r_Idx = ?`,
  likeSelect: `select r_Idx from likes where u_Idx=?`,
  likeSelectForRestaurantDetail: `select * from likes where u_Idx and r_Idx`,

  restaurantInsert: `insert into restaurants (r_Idx,r_name,image,address,tag,price,stars,parking,takeout) values (?,?,?,?,?,?,?,?,?)`,
  restaurantSelect: `select * from restaurants`,
  restaurantSelectByR_Idx: `select * from restaurants where r_Idx=?`,
  restaurantSelectBySearch: `select * from restaurants where tag like ? or r_name like ?`,
  c_sumSelectByR_Idx: `select count(r_Idx) as c_sum from comments where r_Idx=?`,
  restaurantSelectByCategory: `select * from restaurants where tag like ? or tag like ?`,
  restaurantUpdate: `update restaurants set ? where r_Idx=?`,

  themeSelectForMain: `select distinct(t_title),t_image from themes`,
  themeSelectForThemeList: `select distinct(t_title),t_contents from themes where t_title=?`,
  themeSelectByT_title: `select * from themes where t_title=?`,

  commentInsert: `insert into comments (r_Idx,u_Idx,c_title,c_contents,star) values(?,?,?,?,?)`,
  commentSelectByU_Idx: `select * from comments where u_Idx=?`,
  commentSelectForRestaurantDetail: `select * from comments where u_Idx=? and r_Idx=?`,
  commentSelectByR_Idx: `select * from comments where r_Idx=?`,
};
