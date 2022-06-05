import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      admin
    }
  }
`;

export const QUERY_USER = gql`
  query User($id: ID) {
    user(_id: $id) {
      _id
      username
      email
      admin
    }
  }
`;

export const PLACEHOLDER = gql``;
