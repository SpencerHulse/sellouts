const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type AmazonS3 {
    url: String
  }

  type Auth {
    token: ID
    user: User
    message: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Checkout {
    session: ID
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
    customer: User
    status: String
    stripeId: String
    paymentStatus: String
    deliveryAddress: String
    shippingType: String
    shippingCost: Float
    tax: Float
    subtotal: Float
    total: Float
  }

  input OrderInput {
    _id: ID
    purchaseDate: String
    products: [ID]
    customer: ID
    status: String
    stripeId: String
    paymentStatus: String
    deliveryAddress: String
    shippingType: String
    shippingCost: Float
    tax: Float
    subtotal: Float
    total: Float
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
    title: String
    review: String
    createdAt: String
    rating: Int
    upvotes: Int
    downvotes: Int
    user: User
  }

  input ReviewInput {
    _id: ID
    title: String
    review: String
    createdAt: String
    rating: Int
    upvotes: Int
    downvotes: Int
    user: ID
  }

  type Stripe {
    session: StripeSession
    shipping: StripeShippingRate
  }

  type StripeSession {
    id: ID
    amount_subtotal: Int
    amount_total: Int
    payment_status: String
    shipping: StripeShipping
  }

  type StripeShipping {
    address: StripeAddress
  }

  type StripeAddress {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
  }

  type StripeShippingRate {
    id: ID
    display_name: String
    fixed_amount: StripeFixedRate
  }

  type StripeFixedRate {
    amount: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    admin: Boolean
  }

  type Query {
    categories: [Category]
    checkout(products: [ID]!): Checkout
    orders(_id: ID, customer: ID, status: String, stripeId: String): [Order]
    products(_id: ID): [Product]
    promotions(_id: ID): [Promotion]
    reviews(_id: ID): [Review]
    session(id: ID): Stripe
    uploadImage(mainImage: String!): AmazonS3
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
