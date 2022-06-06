import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(_id: $id) {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String) {
    updateCategory(_id: $id, name: $name) {
      _id
      name
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($input: OrderInput) {
    addOrder(input: $input) {
      _id
      purchaseDate
      products {
        _id
        name
        mainImage
        category {
          name
        }
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
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(_id: $id) {
      _id
      purchaseDate
      customer {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: OrderInput) {
    updateOrder(input: $input) {
      _id
      purchaseDate
      products {
        _id
        name
        mainImage
        category {
          name
        }
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

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInput) {
    addProduct(input: $input) {
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput) {
    updateProduct(input: $input) {
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

export const ADD_PROMOTION = gql`
  mutation AddPromotion($input: PromotionInput) {
    addPromotion(input: $input) {
      _id
      name
      percentage
      ends
      membersOnly
    }
  }
`;

export const DELETE_PROMOTION = gql`
  mutation DeletePromotion($id: ID!) {
    deletePromotion(_id: $id) {
      _id
      name
      ends
    }
  }
`;

export const UPDATE_PROMOTION = gql`
  mutation UpdatePromotion($input: PromotionInput) {
    updatePromotion(input: $input) {
      _id
      name
      percentage
      ends
      membersOnly
    }
  }
`;

export const PLACEHOLDER = gql``;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        admin
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      admin
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        admin
      }
    }
  }
`;
