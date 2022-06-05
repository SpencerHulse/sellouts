const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const {
  Category,
  Order,
  Product,
  Promotion,
  Review,
  User,
} = require("../models");

const resolvers = {
  Query: {
    // Category Queries
    categories: async (parent, args) => {
      const categories = await Category.find({});
      return categories;
    },
    users: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
    user: async (parent, { _id }) => {
      const user = await User.findById(_id);
      return user;
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
    addUser: async (parent, args) => {
      let usernameCheck = await User.find({ username: args.username });
      if (usernameCheck.length) {
        console.log(usernameCheck);
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
