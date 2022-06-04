const express = require("express");
const app = express();
const path = require("path");

const { ApolloServer } = require("apollo-server-express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}...`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
