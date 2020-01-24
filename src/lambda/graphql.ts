import { ApolloServer } from "apollo-server-lambda";
import "reflect-metadata";
// import models from "../models";
import resolvers from "../resolvers";
import schemas from "../schema";
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

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
