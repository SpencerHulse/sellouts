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

  type User {
    _id: ID
    username: String
    email: String
    admin: Boolean
  }

  type Query {
    categories: [Category]

    users: [User]
    user(_id: ID): User
  }

  type Mutation {
    addCategory(name: String!): Category
    deleteCategory(_id: ID!): Category
    updateCategory(_id: ID!, name: String): Category

    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
