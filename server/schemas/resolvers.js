const {
  Category,
  Membership,
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
