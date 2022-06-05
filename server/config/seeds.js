const db = require("./connection");
const {
  Category,
  Order,
  Product,
  Promotion,
  Review,
  User,
} = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const users = await User.insertMany([
    {
      username: "admin",
      email: "admin@admin.com",
      password: "admin",
      admin: true,
    },
    {
      username: "a",
      email: "a@example.com",
      password: "password",
      admin: false,
    },
    {
      username: "b",
      email: "b@example.com",
      password: "password",
      admin: false,
    },
    {
      username: "c",
      email: "c@example.com",
      password: "password",
      admin: false,
    },
    {
      username: "d",
      email: "d@example.com",
      password: "password",
      admin: false,
    },
    {
      username: "e",
      email: "e@example.com",
      password: "password",
      admin: false,
    },
  ]);

  console.log("users seeded");

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
