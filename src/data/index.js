import ApolloClient, { gql } from "apollo-boost";

export const client = new ApolloClient({
  request: (operation) => {
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": processess.env.HASURA,
      },
    });
  },
  uri: processess.env.HASURAURL,
});
