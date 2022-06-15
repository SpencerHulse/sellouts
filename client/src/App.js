import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Homepage from "./pages/homepage";

// Components
import Accounts from "./pages/accounts";
import Nav from "./components/Nav";
import PurchaseSuccess from "./pages/purchase-success";
import SingleProduct from "./pages/single-product";
import ImageUpload from "./components/ImageUpload";

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
          <Route path="product/:productId" element={<SingleProduct />} />
          <Route path="signup" element={<Accounts formType={"signup"} />} />
          <Route path="success" element={<PurchaseSuccess />} />
          <Route path="upload" element={<ImageUpload />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
