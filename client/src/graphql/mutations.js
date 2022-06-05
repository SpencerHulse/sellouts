import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $admin: Boolean
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      admin: $admin
    ) {
      token
      message
      user {
        _id
        username
        email
      }
    }
  }
`;
