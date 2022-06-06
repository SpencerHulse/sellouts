const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
    message: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
    customer: User
    status: String
    deliveryAddress: String
    shippingType: String
    shippingCost: Float
    tax: Float
    productsTotal: Float
  }

  input OrderInput {
    _id: ID
    purchaseDate: String
    products: [ID]
    customer: ID
    status: String
    deliveryAddress: String
    shippingType: String
    shippingCost: Float
    tax: Float
  }

  type Product {
    _id: ID
    name: String
    description: String
    details: [String]
    price: Float
    inventory: Int
    images: [String]
    mainImage: String
    category: Category
    promotion: Promotion
    reviews: [Review]
    promotionPrice: Float
    rating: Float
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    details: [String]
    price: Float
    inventory: Int
    images: [String]
    mainImage: String
    category: ID
    promotion: ID
    reviews: [ID]
  }

  type Promotion {
    _id: ID
    name: String
    percentage: Int
    ends: String
    membersOnly: Boolean
  }

  input PromotionInput {
    _id: ID
    name: String
    percentage: Int
    ends: String
    membersOnly: Boolean
  }

  type Review {
    _id: ID
    review: String
    createdAt: String
    rating: Int
    upvotes: Int
    downvotes: Int
    user: User
  }

  input ReviewInput {
    _id: ID
    review: String
    createdAt: String
    rating: Int
    upvotes: Int
    downvotes: Int
    user: ID
  }

  type User {
    _id: ID
    username: String
    email: String
    admin: Boolean
  }

  type Query {
    categories: [Category]
    orders(_id: ID, customer: ID, status: String): [Order]
    products(_id: ID): [Product]
    promotions(_id: ID): [Promotion]
    reviews(_id: ID): [Review]
    users(_id: ID): [User]
  }

  type Mutation {
    addCategory(name: String!): Category
    deleteCategory(_id: ID!): Category
    updateCategory(_id: ID!, name: String): Category

    addOrder(input: OrderInput): Order
    deleteOrder(_id: ID!): Order
    updateOrder(input: OrderInput): Order

    addProduct(input: ProductInput): Product
    deleteProduct(_id: ID!): Product
    updateProduct(input: ProductInput): Product

    addPromotion(input: PromotionInput): Promotion
    deletePromotion(_id: ID!): Promotion
    updatePromotion(input: PromotionInput): Promotion

    addReview(input: ReviewInput): Product
    deleteReview(_id: ID!): Product
    updateReview(input: ReviewInput): Review

    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
