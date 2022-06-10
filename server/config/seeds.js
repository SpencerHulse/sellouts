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

  await User.create({
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    admin: true,
  });

  await User.create({
    username: "a",
    email: "a@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "b",
    email: "b@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "c",
    email: "c@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "d",
    email: "d@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "e",
    email: "e@example.com",
    password: "password",
    admin: false,
  });

  const users = await User.find({});
  console.log(users[0]._id);
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

  await Review.deleteMany();

  const reviews = await Review.insertMany([
    {
      review:
        "My name is Commander Shepard, and this is my favorite shop on the citadel.",
      rating: 5,
      upvotes: 27,
      downvotes: 2,
      user: users[0]._id,
    },
    {
      review:
        "Absolutely a great deal, and you will not regret grabbing one for yourself.",
      rating: 4,
      upvotes: 4,
      downvotes: 1,
      user: users[3]._id,
    },
    {
      review: "This doesn't let me see smells. Waste of money.",
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[2]._id,
    },
  ]);

  console.log("reviews seeded");

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
      reviews: [reviews[0]._id, reviews[2]._id, reviews[1]._id],
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
