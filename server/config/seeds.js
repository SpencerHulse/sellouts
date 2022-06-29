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
    email: "admin@sellouts.com",
    password: "admin",
    admin: true,
  });

  await User.create({
    username: "Able",
    email: "ablenotcain@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Barney",
    email: "bigpurple@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Carol",
    email: "carolallyear@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Daniel",
    email: "dantheman@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Ellen",
    email: "ethegen@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Francis",
    email: "frankcastle@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Garrus",
    email: "garrushasreach@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Helen",
    email: "hoftroy@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Indigo",
    email: "isacolor@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Jack",
    email: "jacksparrow@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Kelly",
    email: "kclarkson@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Larson",
    email: "laquine@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Miranda",
    email: "mirandalawson@example.com",
    password: "password",
    admin: false,
  });

  await User.create({
    username: "Nora",
    email: "noraisnora@example.com",
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
      ends: DateTime.now().plus({ days: 30 }).toFormat("M/dd/yyyy"),
    },
    {
      name: "Smaller Blowout",
      percentage: 30,
      ends: DateTime.now().plus({ days: 22 }).toFormat("M/dd/yyyy"),
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
        .minus({ days: 1 })
        .toFormat("M/dd/yyyy, hh/mm a"),
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
        .minus({ days: 2 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      rating: 4,
      upvotes: 4,
      downvotes: 1,
      user: users[1]._id,
    },
    {
      title: "Ridiculous product",
      review: "This doesn't let me see smells. Waste of money.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[2]._id,
    },
    {
      title: "It's not bad",
      review: "Not the best, but it's not the worst, either.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[3]._id,
    },
    {
      title: "Looks great!",
      review: "Worth!",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 5,
      upvotes: 3,
      downvotes: 120,
      user: users[4]._id,
    },
    {
      title: "Not just a simple hat",
      review:
        "Few people know the history of this hat, which first made its appearance on French beaches in 1934. But since it's arrival, life as we know it has changed, with the sun no longer standing a change against its superior protection. It's stylish, too.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 5,
      upvotes: 3,
      downvotes: 120,
      user: users[5]._id,
    },
    {
      title: "Great deal",
      review: "I got mine on sale for two bucks.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
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
        .minus({ days: 10 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      rating: 2,
      upvotes: 3,
      downvotes: 120,
      user: users[7]._id,
    },
    {
      title: "Trash",
      review: "Already threw mine away.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[8]._id,
    },
    {
      title: "Great product, odd fit.",
      review:
        "High quality hat, but it didn't fit my father's head. I'm the one wearing it now.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[9]._id,
    },
    {
      title: "Bald no more!",
      review: "Or so people may believe when I'm wearing this great hat.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 4,
      upvotes: 3,
      downvotes: 120,
      user: users[10]._id,
    },
    {
      title: "FLAMMABLE!",
      review:
        "Caught fire while I was grilling! No warning and they won't offer me a refund. Garbage!",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      rating: 1,
      upvotes: 3,
      downvotes: 120,
      user: users[11]._id,
    },
    {
      title: "Odd material",
      review: "It's a bit scratchy when worn for long periods.",
      createdAt: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
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
      name: "Summer Hat",
      description:
        "This hat is the perfect choice for Summer, allowing you to take shade from the sun while also looking great in the process. It is made out of sturdy materials and is great for working outdoors.",
      details: [
        "The material is breathable and helps prevent excessive sweating.",
        "The brim is the perfect size to offer shade while maximizing visibility.",
        "It is a one-size-fits-most options.",
      ],
      price: 19.99,
      inventory: 72,
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
      name: "Casual Round Hat",
      description:
        "This product is the perfect accessory for someone going out for a casual stroll or day at the beach. It provides increased breathability for comfort and is made out of soft material that you can wear all day without discomfort.",
      details: [
        "The design goes with many different outfits and works on any occasion.",
        "The material keeps you cool and prevents sweating.",
      ],
      price: 14.99,
      inventory: 87,
      images: ["https://nsense-images.s3.amazonaws.com/hat2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/hat2.png",
      category: categories[0],
      promotion: promotions[0],
    },
    {
      name: "Casual T-Shirt",
      description:
        "A black t-shirt that is made from 100% cotton. The material is fantastic, and it allows you full range of motion while wearing it.",
      details: ["Only available in large size.", "Made from 100% cotton."],
      price: 29.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shirt1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shirt1.png",
      category: categories[1],
    },
    {
      name: "Moisture-Wicking Shirt",
      description:
        "The shirt is made with advanced material that keeps you cool and dry through the hottest days or most intense workouts. The material is a patented blend of materials that is sure to last a long time.",
      details: [
        "It only fits highly-athletic figures.",
        "The material is tough but comfortable.",
        "Made in China.",
      ],
      price: 49.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/shirt2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shirt2.png",
      category: categories[1],
    },
    {
      name: "Dark Jeans",
      description:
        "Jeans. The kind that will last you a lifetime. You throw them into a hard day's work, and you come out the other side a different man. No rips here. Just jeans.",
      details: [
        "Tough.",
        "Ready to work.",
        "Pockets.",
        "Belt loops.",
        "America.",
      ],
      price: 79.99,
      inventory: 100,
      images: ["https://nsense-images.s3.amazonaws.com/pants1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/pants1.png",
      category: categories[2],
    },
    {
      name: "Casual Pants",
      description:
        "These pants are made to go with almost any outfit. The color is fantastic, and the fit is optimal for those with a 34 waist. It only comes in one size, but those who can wear them will love them.",
      details: ["Absolutely great fit.", "Comfy.", "Rip-resistant."],
      price: 59.99,
      inventory: 112,
      images: ["https://nsense-images.s3.amazonaws.com/pants2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/pants2.png",
      category: categories[2],
    },
    {
      name: "Orange socks.",
      description:
        "Orange socks made from 100% cotton. They are great at keeping your feet comfortable and dry all day.",
      details: [
        "They are orange.",
        "They are soft.",
        "They go great in formal settings.",
      ],
      price: 13.99,
      inventory: 99,
      images: ["https://nsense-images.s3.amazonaws.com/socks1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/socks1.png",
      category: categories[3],
    },
    {
      name: "Festive Socks",
      description:
        "These festive socks are a great way to show your individuality. They can even be work with formal attire, hiding beneath your pants and showing the world how big a rebel you are.",
      details: ["Lots of color.", "Great price.", "Four pairs in each set."],
      price: 9.99,
      inventory: 14,
      images: ["https://nsense-images.s3.amazonaws.com/socks2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/socks2.png",
      category: categories[3],
    },
    {
      name: "Kick Into These Kicks",
      description:
        "Some fly shoes for a fly individual. Try them on today and wonder why you ever bought a reasonably-priced pair of shoes when these were right here.",
      details: ["Fly.", "Arch support.", "Steel toes."],
      price: 269.99,
      inventory: 1000,
      images: ["https://nsense-images.s3.amazonaws.com/shoes1.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shoes1.png",
      category: categories[4],
    },
    {
      name: "Blue Shoes",
      description:
        "A pair of shoes made to give you the impression of stepping on clouds with every movement of your foot.",
      details: [
        "All white... soles.",
        "Many sizes, but only one available here.",
        "Made in China, so quality is assured.",
      ],
      price: 129.99,
      inventory: 34,
      images: ["https://nsense-images.s3.amazonaws.com/shoes2.png"],
      mainImage: "https://nsense-images.s3.amazonaws.com/shoes2.png",
      category: categories[4],
    },
  ]);

  console.log("products seeded");

  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      purchaseDate: DateTime.now().toFormat("M/dd/yyyy, hh/mm a"),
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[1]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 6 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[2]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 8 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[2]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 4 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[5]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 9 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[6]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 7 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      status: "delivered",
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[0]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
    {
      purchaseDate: DateTime.now()
        .minus({ day: 6 })
        .toFormat("M/dd/yyyy, hh/mm a"),
      status: "shipped",
      products: [
        products[0]._id,
        products[0]._id,
        products[1]._id,
        products[1]._id,
        products[1]._id,
        products[3]._id,
        products[3]._id,
        products[4]._id,
        products[4]._id,
      ],
      items: [
        "Hat One-*-1198-*-2",
        "Hat Two-*-2997-*-3",
        "Shirt Two-*-1998-*-2",
        "Pants One-*-11998-*-2",
      ],
      customer: users[0]._id,
      stripeId: "91219jasnadks",
      paymentStatus: "paid",
      deliveryAddress: "290 This Street Chattanooga, TN",
      shippingType: "Free shipping",
      shippingCost: 0,
      tax: 1319,
      subtotal: 18191,
      total: 19510,
    },
  ]);

  console.log("orders seeded");

  process.exit();
});
