import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Session from "supertokens-web-js/recipe/session";
import { ensureSuperTokensInit } from "../config/backend";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "https://exciting-kitten-28.hasura.app/v1/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await Session.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;