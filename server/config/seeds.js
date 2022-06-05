const db = require("./connection");
const {
  Category,
  Membership,
  Order,
  Product,
  Promotion,
  Review,
  User,
} = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "hats" },
    { name: "shirts" },
    { name: "pants" },
    { name: "socks" },
    { name: "shoes" },
  ]);

  console.log("categories seeded");

  process.exit();
});
