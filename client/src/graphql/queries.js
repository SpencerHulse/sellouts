import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_ORDERS = gql`
  query Orders($id: ID, $customer: ID, $status: String) {
    orders(_id: $id, customer: $customer, status: $status) {
      _id
      purchaseDate
      products {
        category {
          name
        }
        _id
        name
        mainImage
      }
      customer {
        _id
        username
        email
      }
      status
      deliveryAddress
      shippingType
      shippingCost
      tax
      productsTotal
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
        percentage
        ends
        membersOnly
      }
      reviews {
        _id
      }
      promotionPrice
      rating
    }
  }
`;

export const QUERY_PROMOTIONS = gql`
  query Promotions($id: ID) {
    promotions(_id: $id) {
      _id
      name
      percentage
      ends
      membersOnly
    }
  }
`;

export const PLACEHOLDER = gql``;

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
