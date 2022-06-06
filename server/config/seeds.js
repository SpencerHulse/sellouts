const db = require("./connection");
const { DateTime } = require("luxon");
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

  await Promotion.deleteMany();

  const promotions = await Promotion.insertMany([
    {
      name: "Summer Blowout",
      percentage: 40,
      ends: DateTime.now()
        .plus({ days: 30 })
        .toLocaleString(DateTime.DATE_SHORT),
    },
    {
      name: "Smaller Blowout",
      percentage: 30,
      ends: DateTime.now()
        .plus({ days: 30 })
        .toLocaleString(DateTime.DATE_SHORT),
    },
  ]);

  console.log("promotions seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Hat One",
      description: "A red hat.",
      details: ["It's red", "It's big", "It's cheap"],
      price: 9.99,
      inventory: 100,
      images: ["hatRed", "hatRedWorn"],
      mainImage: "hat",
      category: categories[0],
      promotion: promotions[0],
    },
    {
      name: "Hat Two",
      description: "A blue hat.",
      details: ["It's blue", "It's small", "It's quality"],
      price: 9.99,
      inventory: 100,
      images: ["hatBlue", "hatBlueWorn"],
      mainImage: "hatBlueWorn",
      category: categories[0],
    },
    {
      name: "Shirt One",
      description: "A white shirt.",
      details: ["It's white", "It comes in many sizes", "100% cotton"],
      price: 19.99,
      inventory: 100,
      images: ["shirt"],
      mainImage: "shirt",
      category: categories[1],
    },
    {
      name: "Shirt Two",
      description: "A plaid shirt.",
      details: ["Cool design", "Soft fabric", "Made in China"],
      price: 9.99,
      inventory: 100,
      images: ["ChinaShirt"],
      mainImage: "ChinaShirt",
      category: categories[1],
    },
    {
      name: "Pants One",
      description: "Jeans.",
      details: ["Tough", "Comfy", "Pockets"],
      price: 29.99,
      inventory: 100,
      images: ["jeans"],
      mainImage: "jeans",
      category: categories[2],
    },
    {
      name: "Pants Two",
      description: "Dress pants.",
      details: ["Dressy", "Comfy", "Rip-resistant"],
      price: 9.99,
      inventory: 100,
      images: ["dressy"],
      mainImage: "dressy",
      category: categories[2],
    },
    {
      name: "Socks One",
      description: "Black socks.",
      details: [
        "They are black",
        "They are soft",
        "They go great in formal settings",
      ],
      price: 9.99,
      inventory: 100,
      images: ["blackSocks"],
      mainImage: "blackSocks",
      category: categories[3],
    },
    {
      name: "Socks Two",
      description: "Knee-high socks.",
      details: ["Lots of material", "Great price", "Four pairs in each set"],
      price: 9.99,
      inventory: 100,
      images: ["kneeSocks"],
      mainImage: "kneeSocks",
      category: categories[3],
    },
    {
      name: "Shoes One",
      description: "Some fly shoes.",
      details: ["Fly", "Arch support", "Steel toes"],
      price: 69.99,
      inventory: 100,
      images: ["flyShoes"],
      mainImage: "flyShoes",
      category: categories[4],
    },
    {
      name: "Shoes Two",
      description: "White shoes.",
      details: ["All white", "Many sizes", "Made in China"],
      price: 29.99,
      inventory: 100,
      images: ["ChinaShoes"],
      mainImage: "ChinaShoes",
      category: categories[4],
    },
  ]);

  console.log("products seeded");

  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      products: [
        products[0]._id,
        products[0]._id,
        products[0]._id,
        products[2]._id,
      ],
      customer: users[1]._id,
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "standard",
      shippingCost: 4.99,
      tax: 13.99,
    },
    {
      products: [
        products[0]._id,
        products[0]._id,
        products[0]._id,
        products[2]._id,
      ],
      customer: users[1]._id,
      status: "shipped",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "overnight",
      shippingCost: 14.99,
      tax: 13.99,
    },
  ]);

  console.log("orders seeded");

  process.exit();
});
