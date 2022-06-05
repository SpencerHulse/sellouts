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
  query Users($id: ID) {
    users(_id: $id) {
      _id
      username
      email
      admin
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query Products($id: ID) {
    products(_id: $id) {
      _id
      name
      description
      details
      price
      inventory
      images
      mainImage
      category {
        _id
        name
      }
      promotion {
        _id
      }
      reviews {
        _id
      }
      promotionPrice
      rating
    }
  }
`;

export const PLACEHOLDER = gql``;
