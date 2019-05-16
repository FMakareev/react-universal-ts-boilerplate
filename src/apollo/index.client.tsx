/* global ENDPOINT_CLIENT */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { apolloFaker, ENDPOINT_CLIENT, window } from '../shared/constants';
import { indexMock } from './index.mock';

export const client = () => {
  if (apolloFaker) {
    return indexMock;
  }

  return new ApolloClient({
    cache: new InMemoryCache().restore(window ? window.APOLLO_STATE : {}),
    link: createHttpLink({
      uri: `${ENDPOINT_CLIENT}/graphql`,
      credentials: 'same-origin',
    }),
    ssrForceFetchDelay: 100,
  });
};
export default client;
