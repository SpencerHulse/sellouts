import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Homepage from "./pages/homepage";

// Components
import Accounts from "./pages/accounts";
import Nav from "./components/Nav";
import OrderHistory from "./pages/order-history";
import PurchaseSuccess from "./pages/purchase-success";
import SingleProduct from "./pages/single-product";
// Admin Components
import Admin from "./components/Admin";
import AdminProducts from "./components/Admin/Products";
import AddProduct from "./components/Admin/Products/addProduct";
import UpdateProduct from "./components/Admin/Products/updateProduct";
import AdminCategories from "./components/Admin/Categories";
import AddCategory from "./components/Admin/Categories/addCategory";
import UpdateCategory from "./components/Admin/Categories/updateCategory";
import DeleteCategory from "./components/Admin/Categories/deleteCategory";
import AdminUsers from "./components/Admin/Users";
import DeleteUser from "./components/Admin/Users/deleteUser";

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Accounts formType={"login"} />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="products" element={<AdminProducts />}>
              <Route path="add-product" element={<AddProduct />} />
              <Route path="update-product" element={<UpdateProduct />} />
            </Route>
            <Route path="categories" element={<AdminCategories />}>
              <Route path="add-category" element={<AddCategory />} />
              <Route path="update-category" element={<UpdateCategory />} />
              <Route path="delete-category" element={<DeleteCategory />} />
            </Route>
            <Route path="users" element={<AdminUsers />}>
              <Route path="delete-user" element={<DeleteUser />} />
            </Route>
          </Route>
          <Route path="product/:productId" element={<SingleProduct />} />
          <Route path="signup" element={<Accounts formType={"signup"} />} />
          <Route path="success" element={<PurchaseSuccess />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
