import { ApolloServer } from "apollo-server-lambda";
import "reflect-metadata";
// import models from "../models";
import resolvers from "../resolvers";
import schemas from "../schema";
import * as mongoose from "mongoose";
import models from "../models";
import { MONGODB_URI } from "../utils/constants";

const server = new ApolloServer({
  typeDefs: schemas, resolvers, context: async () => {
    // context: async ({ event, context }) => {
    return {
      models
    }
  }
});

mongoose
  .connect(MONGODB_URI, { 'useUnifiedTopology': true, 'useNewUrlParser': true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.log(err);
  });

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
