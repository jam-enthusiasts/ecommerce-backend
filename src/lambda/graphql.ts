import { ApolloServer } from "apollo-server-lambda";
import "reflect-metadata";
// import models from "../models";
import resolvers from "../resolvers";
import schemas from "../schema";
import * as mongoose from "mongoose";
import { MONGODB_URI } from "../utils/constants";
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// Provide resolver functions for your schema fields
// const resolvers: IResolvers = {
//   Query: {
//     // helloWorld(_: void, args: void): string {
//     //   return `👋 Hello world! 👋`;
//     // },
//     hello: () => {
//       return "Hello world!"
//     }
//   }
// }

const server = new ApolloServer({ typeDefs: schemas, resolvers });

mongoose
  .connect(MONGODB_URI)
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
