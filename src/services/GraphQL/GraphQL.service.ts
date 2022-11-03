import { GraphQLGUID } from 'graphql-scalar';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import SysEnv  from '../../modules/SysEnv'

const typeDefs = `
scalar GUID

type Feature {
  uuid: GUID!
  key: String!
  enabled: Boolean!
}

type Application {
  organization: GUID!
  uuid: GUID!
  awsmaApplicationId: GUID
  contentRating: String!
  productVersion: String!
  useDefaultPushCategories: Boolean!
  features: [Feature!]!
}

type Organization {
  applications: [Application!]!
}

type Query {
  organization(uuid: GUID!): Organization
}

input CreateApplicationInput {
  organization: GUID!
  contentRating: String!
  productVersion: String!
  useDefaultPushCategories: Boolean!
  enableAppEngagementAnalytics: Boolean = false
}

type Mutation {
  createApplication(input: CreateApplicationInput!): Application!
}
`

class AppGraphQL {


  listen() {
    const server = new ApolloServer({
      typeDefs,
      resolvers: {
        GUID: GraphQLGUID,
      },
    });
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  startStandaloneServer(server, {
    listen: { port: SysEnv.GRAPHQL_PORT },
    }).then((url) => {
        console.log(`🚀  Server ready at: ${url}`);
    });
  }
}

export default AppGraphQL;
