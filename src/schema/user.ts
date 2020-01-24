import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
    hello: String
	}

	# type User {
	# 	name: String!
	# 	email: String!
	# }
`;