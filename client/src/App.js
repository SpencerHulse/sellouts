import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Homepage from "./pages/homepage";

// Components
import Accounts from "./pages/accounts";
import Nav from "./components/Nav";
import OrderHistory from "./pages/order-history";
import PurchaseSuccess from "./pages/purchase-success";
import SingleProduct from "./pages/single-product";

// --- Admin Components ---
import Admin from "./components/Admin";

// Dashboard
import Dashboard from "./components/Admin/Dashboard";

// Category
import AdminCategories from "./components/Admin/Categories";
import AllCategories from "./components/Admin/Categories/allCategories";
import AddCategory from "./components/Admin/Categories/addCategory";
import UpdateCategory from "./components/Admin/Categories/updateCategory";
import DeleteCategory from "./components/Admin/Categories/deleteCategory";
// Product
import AdminProducts from "./components/Admin/Products";
import AllProducts from "./components/Admin/Products/allProducts";
import AddProduct from "./components/Admin/Products/addProduct";
import UpdateProduct from "./components/Admin/Products/updateProduct";
import DeleteProduct from "./components/Admin/Products/deleteProduct";
// Promotion
import AdminPromotions from "./components/Admin/Promotions";
import AllPromotions from "./components/Admin/Promotions/allPromotions";
import AddPromotion from "./components/Admin/Promotions/addPromotion";
import UpdatePromotion from "./components/Admin/Promotions/updatePromotion";
import DeletePromotion from "./components/Admin/Promotions/deletePromotion";
// User
import AdminUsers from "./components/Admin/Users";
import DeleteUser from "./components/Admin/Users/deleteUser";
// Orders
import AdminOrders from "./components/Admin/Orders";
import UpdateOrders from "./components/Admin/Orders/updateOrders";

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
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="categories" element={<AdminCategories />}>
              <Route index element={<AllCategories />} />
              <Route path="all-categories" element={<AllCategories />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="update-category" element={<UpdateCategory />} />
              <Route path="delete-category" element={<DeleteCategory />} />
            </Route>
            <Route path="products" element={<AdminProducts />}>
              <Route index element={<AllProducts />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="update-product" element={<UpdateProduct />} />
              <Route path="delete-product" element={<DeleteProduct />} />
            </Route>
            <Route path="promotions" element={<AdminPromotions />}>
              <Route index element={<AllPromotions />} />
              <Route path="add-promotions" element={<AddPromotion />} />
              <Route path="update-promotions" element={<UpdatePromotion />} />
              <Route path="delete-promotions" element={<DeletePromotion />} />
            </Route>
            <Route path="users" element={<AdminUsers />}>
              <Route path="delete-user" element={<DeleteUser />} />
            </Route>
            <Route path="orders" element={<AdminOrders />}>
              <Route path="update-orders" element={<UpdateOrders />} />
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
