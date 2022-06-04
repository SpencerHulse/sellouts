const express = require("express");
const app = express();
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}...`);
  });
});
