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
    addCategory: (parent, args) => {
      return Category.create(args);
    },
    deleteCategory: (parent, { _id }) => {
      // .exec() prevents "Query was already executed" error
      return Category.findByIdAndDelete({ _id }).exec();
    },
    updateCategory: (parent, args) => {
      return Category.findByIdAndUpdate(args._id, args, { new: true }).exec();
    },
  },
};

module.exports = resolvers;
