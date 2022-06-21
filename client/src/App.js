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
