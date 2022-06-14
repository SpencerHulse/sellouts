import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

// Requires an array of product IDs
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
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
        name
      }
      reviews {
        _id
        review
        createdAt
        rating
        upvotes
        downvotes
        user {
          _id
          username
          email
        }
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

export const QUERY_REVIEWS = gql`
  query Reviews($id: ID) {
    reviews(_id: $id) {
      _id
      review
      createdAt
      rating
      upvotes
      downvotes
      user {
        _id
        username
        email
      }
    }
  }
`;

// Retrieves Secure URLs used to upload AWS s3 Images
export const QUERY_URL = gql`
  query uploadImage($mainImage: String!) {
    uploadImage(mainImage: $mainImage) {
      url
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
