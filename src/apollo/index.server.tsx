/* global ENDPOINT_SERVER */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Request } from 'express';
import isomorphicFetch from 'isomorphic-fetch';
//
import { ENDPOINT_SERVER, apolloFaker } from '../shared/constants';
import { indexMock } from './index.mock';

export const client = (request: Request) => {
  if (apolloFaker) {
    return indexMock;
  }
  return new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: `${ENDPOINT_SERVER}/graphql`,
      credentials: 'same-origin',
      fetch: isomorphicFetch,
      headers: {
        Cookie: request.header('Cookie'),
      },
    }),
    queryDeduplication: true,
    connectToDevTools: true,
    cache: new InMemoryCache(),
  });
};

export default client;
