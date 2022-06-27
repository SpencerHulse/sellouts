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
    username: "Able",
    email: "a@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Barney",
    email: "b@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Carol",
    email: "c@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Daniel",
    email: "d@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Ellen",
    email: "e@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Francis",
    email: "f@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Garrus",
    email: "g@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Helen",
    email: "h@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Indigo",
    email: "i@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Jack",
    email: "j@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Kelly",
    email: "k@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Larson",
    email: "l@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Miranda",
    email: "m@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Nora",
    email: "n@example.com",
    password: "password",
    admin: false,
  });

  const users = await User.find({});
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
      title: "Commander Shepard only recommends the best!",
      review:
        "My name is Commander Shepard, and this is my favorite shop on the citadel.",
      createdAt: DateTime.now()
        .plus({ days: 1 })
        .toLocaleString(DateTime.DATETIME_SHORT),
      rating: 5,
      upvotes: 27,
      downvotes: 2,
      user: users[0]._id,
    },
    {
      title: "Fantastic deal",
      review:
        "Absolutely a great deal, and you will not regret grabbing one for yourself.",
      createdAt: DateTime.now()
        .plus({ days: 2 })
        .toLocaleString(DateTime.DATETIME_SHORT),
      rating: 4,
      upvotes: 4,
      downvotes: 1,
      user: users[1]._id,
    },
    {
      title: "Ridiculous product",
      review: "This doesn't let me see smells. Waste of money.",
      createdAt: DateTime.now(),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[2]._id,
    },
    {
      title: "It's not bad",
      review: "Not the best, but it's not the worst, either.",
      createdAt: DateTime.now(),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[3]._id,
    },
    {
      title: "Looks great!",
      review: "Worth!",
      createdAt: DateTime.now(),
      rating: 5,
      upvotes: 3,
      downvotes: 120,
      user: users[4]._id,
    },
    {
      title: "Not just a simple hat",
      review:
        "Few people know the history of this hat, which first made its appearance on French beaches in 1934. But since it's arrival, life as we know it has changed, with the sun no longer standing a change against its superior protection. It's stylish, too.",
      createdAt: DateTime.now(),
      rating: 5,
      upvotes: 3,
      downvotes: 120,
      user: users[5]._id,
    },
    {
      title: "Great deal",
      review: "I got mine on sale for two bucks.",
      createdAt: DateTime.now(),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[6]._id,
    },
    {
      title: "Started showing signs of wear after a week.",
      review:
        "Not sure why they sell products that can't remain perfectly fine after an Amazon Jungle trip, but it's disappointing.",
      createdAt: DateTime.now()
        .plus({ days: 10 })
        .toLocaleString(DateTime.DATETIME_SHORT),
      rating: 2,
      upvotes: 3,
      downvotes: 120,
      user: users[7]._id,
    },
    {
      title: "Trash",
      review: "Already threw mine away.",
      createdAt: DateTime.now(),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[8]._id,
    },
    {
      title: "Great product, odd fit.",
      review:
        "High quality hat, but it didn't fit my father's head. I'm the one wearing it now.",
      createdAt: DateTime.now(),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[9]._id,
    },
    {
      title: "Bald no more!",
      review: "Or so people may believe when I'm wearing this great hat.",
      createdAt: DateTime.now(),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[10]._id,
    },
    {
      title: "FLAMMABLE!",
      review:
        "Caught fire while I was grilling! No warning and they won't offer me a refund. Garbage!",
      createdAt: DateTime.now(),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[11]._id,
    },
    {
      title: "Odd material",
      review: "It's a bit scratchy when worn for long periods.",
      createdAt: DateTime.now(),
      rating: 3,
      upvotes: 3,
      downvotes: 120,
      user: users[12]._id,
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
      images: ["https://nsense-images.s3.amazonaws.com/hat1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/hat1.png",
      category: categories[0],
      promotion: promotions[0],
      reviews: [
        reviews[0]._id,
        reviews[1]._id,
        reviews[2]._id,
        reviews[3]._id,
        reviews[4]._id,
        reviews[5]._id,
        reviews[6]._id,
        reviews[7]._id,
        reviews[8]._id,
        reviews[9]._id,
        reviews[10]._id,
        reviews[11]._id,
      ],
    },
    {
      name: "Hat Two",
      description: "A blue hat.",
      details: ["It's blue", "It's small", "It's quality"],
      price: 9.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/hat2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/hat2.png",
      category: categories[0],
    },
    {
      name: "Shirt One",
      description: "A white shirt.",
      details: ["It's white", "It comes in many sizes", "100% cotton"],
      price: 19.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shirt1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shirt1.png",
      category: categories[1],
    },
    {
      name: "Shirt Two",
      description: "A plaid shirt.",
      details: ["Cool design", "Soft fabric", "Made in China"],
      price: 9.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shirt2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shirt2.png",
      category: categories[1],
    },
    {
      name: "Pants One",
      description: "Jeans.",
      details: ["Tough", "Comfy", "Pockets"],
      price: 59.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/pants1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/pants1.png",
      category: categories[2],
    },
    {
      name: "Pants Two",
      description: "Dress pants.",
      details: ["Dressy", "Comfy", "Rip-resistant"],
      price: 99.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/pants2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/pants2.png",
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
      images: ["https://nsense-images.s3.amazonaws.com/socks1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/socks1.png",
      category: categories[3],
    },
    {
      name: "Socks Two",
      description: "Knee-high socks.",
      details: ["Lots of material", "Great price", "Four pairs in each set"],
      price: 9.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/socks2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/socks2.png",
      category: categories[3],
    },
    {
      name: "Shoes One",
      description: "Some fly shoes.",
      details: ["Fly", "Arch support", "Steel toes"],
      price: 269.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shoes1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shoes1.png",
      category: categories[4],
    },
    {
      name: "Shoes Two",
      description: "White shoes.",
      details: ["All white", "Many sizes", "Made in China"],
      price: 129.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shoes2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shoes2.png",
      category: categories[4],
    },
  ]);

  console.log("products seeded");

  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      purchaseDate: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
      products: [
        products[0]._id,
        products[0]._id,
        products[0]._id,
        products[2]._id,
      ],
      customer: users[1]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 499,
      tax: 1399,
      subtotal: 4996,
      total: 6894,
    },
    {
      purchaseDate: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
      products: [
        products[0]._id,
        products[0]._id,
        products[0]._id,
        products[2]._id,
      ],
      customer: users[1]._id,
      status: "shipped",
      stripeId: "asdasd1213213",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Next day air",
      shippingCost: 1499,
      tax: 1399,
      subtotal: 4996,
      total: 7894,
    },
  ]);

  console.log("orders seeded");

  process.exit();
});
