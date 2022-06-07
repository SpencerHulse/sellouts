import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Homepage from "./pages/homepage";

// Components
import ComponentOne from "./components/TestComponents/ComponentOne";
import ComponentTwo from "./components/TestComponents/ComponentTwo";
import Nested from "./components/TestComponents/Nested";

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
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="c1" element={<ComponentOne />}>
              <Route path="nested" element={<Nested />} />
            </Route>
            <Route path="c2" element={<ComponentTwo />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
