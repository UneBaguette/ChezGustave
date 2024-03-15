const { mongoose } = require("./src/config/db_info");
const User = require("./src/models/user_model");
const bcrypt = require("bcrypt");

const getTokenTest = async () => {
  try {
    const response = await supertest(require("./src/app")).post("/auth").send({
      email: "data@data.mail",
      password: "EZKIJHEZIUHJI",
    });

    return response.body.token;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const createUsers = async () => {
  let users = [];
  try {
    const user1 = new User({
      email: "data@data.mail",
      name: "Patrick",
      tel: "+672478249",
      password: await bcrypt.hash("EZKIJHEZIUHJI", 10),
      is_admin: true,
    });
    const user2 = new User({
      email: "da@best.in",
      name: "Michel",
      tel: "+Y666Y",
      password: await bcrypt.hash("LGJZLOEGJ", 10),
      is_admin: false,
    });
    const user3 = new User({
      email: "test@test.com",
      name: "Johnny",
      tel: "+11111111",
      password: await bcrypt.hash("IPHJFIEZ", 10),
      is_admin: false,
    });
    users = [user1, user2, user3];
    for (const user of users) {
      user.save();
    }
    return users;
  } catch (err) {
    console.error(err);
    throw new Error("Couldn't create users");
  }
};

const deleteUsers = async (users) => {
  try {
    for (const user of users) {
      await User.deleteOne({ email: user.email });
    }
  } catch (err) {
    console.error(err);
    throw new Error("Couldn't delete all users");
  }
};

afterAll(async () => {
  if (mongoose.connection.db) {
    try {
      await mongoose.connection.close(true);
    } catch (err) {
      console.error(err);
    }
  }
});

module.exports = {
  createUsers,
  deleteUsers,
  getTokenTest,
};
