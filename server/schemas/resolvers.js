const { AuthenticationError } = require("apollo-server-express");
const { DateTime } = require("luxon");
require("dotenv").config();
const { signToken } = require("../utils/auth");
const { generateUploadURL } = require("../utils/aws-s3");
const {
  Category,
  Order,
  Product,
  Promotion,
  Review,
  User,
} = require("../models");
const stripe = require("stripe")(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    // Category
    categories: async (parent, args) => {
      const categories = await Category.find({});
      return categories;
    },
    checkout: async (parent, args, context) => {
      // Parse out the referring URL
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate("products");

      const line_items = [];
      const orderSummary = [];

      await products.forEach((product) => {
        const { _id, name, description, price, promotionPrice, mainImage } =
          product;
        let updated = false;

        orderSummary.map((orderProduct) => {
          if (orderProduct[0]._id === _id) {
            orderProduct[0].quantityPurchased += 1;
            updated = true;
          }
          return orderProduct;
        });

        if (!updated) {
          const productSummary = [
            {
              _id,
              name,
              description,
              price,
              promotionPrice,
              mainImage,
              quantityPurchased: 1,
            },
          ];
          orderSummary.push(productSummary);
        }
      });

      for (let i = 0; i < orderSummary.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: orderSummary[i][0].name,
          description: orderSummary[i][0].description,
        });
        // generate price id using the product id
        let usedPrice = orderSummary[i][0].price;
        if (orderSummary[i][0].promotionPrice) {
          usedPrice = orderSummary[i][0].promotionPrice;
        }
        const price = await stripe.prices.create({
          product: product.id,
          /* Because stripe requires cost in cents */
          unit_amount: Math.round(usedPrice * 100),
          currency: "usd",
          tax_behavior: "exclusive",
        });
        const taxRate = await stripe.taxRates.create({
          display_name: "Sales Tax",
          inclusive: false,
          percentage: 7.25,
          country: "US",
          state: "CA",
          jurisdiction: "US - CA",
          description: "CA Sales Tax",
        });
        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: orderSummary[i][0].quantityPurchased,
          tax_rates: [taxRate.id],
        });
      }

      // Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1499,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    // Order
    orders: async (parent, { _id, customer, status }) => {
      const params = {};

      if (_id) {
        params._id = _id;
      }
      if (customer) {
        params.customer = customer;
      }
      if (status) {
        params.status = status;
      }

      const orders = await Order.find(params)
        .populate("customer")
        .populate("products")
        .populate({
          path: "products",
          populate: "category",
        });

      return orders;
    },
    // Product
    products: async (parent, { _id }) => {
      const params = {};

      if (_id) {
        params._id = _id;
      }

      const product = await Product.find(params)
        .populate("category")
        .populate("promotion")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: "user",
        });

      return product;
    },
    // Promotion
    promotions: async (parent, { _id }) => {
      const params = {};

      if (_id) {
        params._id = _id;
      }

      const promotions = await Promotion.find(params);
      return promotions;
    },
    // Review
    reviews: async (parent, { _id }) => {
      const params = {};
      if (_id) {
        params._id = _id;
      }
      const reviews = await Review.find(params).populate("user");
      return reviews;
    },
    session: async (parent, args) => {
      const session = await stripe.checkout.sessions.retrieve(args.id);
      const shipping = await stripe.shippingRates.retrieve(
        session.shipping_rate
      );
      return { session, shipping };
    },
    // Upload Image to AWS S3 Bucket
    uploadImage: async (parent, { mainImage }) => {
      const url = await generateUploadURL(mainImage);
      return { url };
    },
    // User
    users: async (parent, { _id }) => {
      const params = {};

      if (_id) {
        params._id = _id;
      }

      const users = await User.find(params);
      return users;
    },
  },
  Mutation: {
    // Category Mutations
    addCategory: async (parent, args) => {
      return Category.create(args);
    },
    deleteCategory: async (parent, { _id }) => {
      // .exec() prevents "Query was already executed" error
      return Category.findByIdAndDelete({ _id }).exec();
    },
    updateCategory: async (parent, args) => {
      return Category.findByIdAndUpdate(args._id, args, { new: true }).exec();
    },
    // Order Mutations
    addOrder: async (parent, { input }) => {
      return Order.create(input);
    },
    deleteOrder: async (parent, { _id }) => {
      return Order.findByIdAndDelete(_id);
    },
    updateOrder: async (parent, { input }) => {
      return Order.findByIdAndUpdate(input._id, input, { new: true })
        .populate("customer")
        .populate("products")
        .populate({
          path: "products",
          populate: "category",
        });
    },
    // Product Mutations
    addProduct: async (parent, { input }) => {
      return Product.create(input);
    },
    deleteProduct: async (parent, { _id }) => {
      return Product.findByIdAndDelete({ _id });
    },
    updateProduct: async (parent, { input }) => {
      input.images = input.images.push(input.mainImage);
      return Product.findByIdAndUpdate(input._id, input, { new: true })
        .populate("category")
        .populate("promotion")
        .populate("reviews");
    },
    // Promotion Mutations
    addPromotion: async (parent, { input }) => {
      if (input.ends) {
        input.ends = DateTime.now()
          .plus({ days: Number(input.ends) })
          .toLocaleString(DateTime.DATE_SHORT);
      }

      return Promotion.create(input);
    },
    deletePromotion: async (parent, { _id }) => {
      return Promotion.findByIdAndDelete({ _id });
    },
    updatePromotion: async (parent, { input }) => {
      return Promotion.findByIdAndUpdate(input._id, input, { new: true });
    },
    // Review Mutations
    addReview: async (parent, { input }) => {
      const productId = "629d7fa4215221c7a483c678"; // Placeholder
      const review = await Review.create(input);
      const id = review._id.toString();
      const product = Product.findByIdAndUpdate(
        { _id: productId },
        { $push: { reviews: id } },
        { new: true }
      )
        .populate("category")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: "user",
        });

      return product;
    },
    deleteReview: async (parent, { _id }) => {
      const productId = "629d7fa4215221c7a483c678"; // Placeholder
      await Review.findByIdAndDelete(_id);
      const product = Product.findByIdAndUpdate(
        { _id: productId },
        { $pull: { reviews: _id } },
        { new: true }
      )
        .populate("category")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: "user",
        });

      return product;
    },
    updateReview: async (parent, { input }) => {
      return Review.findByIdAndUpdate(input._id, input, { new: true }).populate(
        "user"
      );
    },
    // User Mutations
    addUser: async (parent, args) => {
      let usernameCheck = await User.find({ username: args.username });
      if (usernameCheck.length) {
        return { message: "Username already exists" };
      }

      let emailCheck = await User.find({ email: args.email });
      if (emailCheck.length) {
        return { message: "There is already an account with this email" };
      }

      let passwordCheck = args.password.length;
      if (passwordCheck < 5) {
        return { message: "The password must be at least 5 characters" };
      }

      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { _id }) => {
      return User.findByIdAndDelete({ _id });
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
