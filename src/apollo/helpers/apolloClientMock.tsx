import { isBrowser, window } from '../../shared/constants';
import {
  IMocks,
  makeExecutableSchema,
  addMockFunctionsToSchema,
  ITypeDefinitions,
} from 'graphql-tools';
import { IMockResolvers } from '../index.mock';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import merge from 'lodash/merge';
import { GraphQLSchema } from 'graphql';

export function setupClient(mockResolvers: IMockResolvers, typeDefs: ITypeDefinitions) {
  return function createClient(overwriteMocks = {}) {
    const mergedMocks: IMocks = merge({ ...mockResolvers }, overwriteMocks);

    const schema: GraphQLSchema = makeExecutableSchema({ typeDefs });

    addMockFunctionsToSchema({
      schema,
      mocks: mergedMocks,
    });

    // @ts-ignore
    const apolloCache: InMemoryCache = new InMemoryCache(isBrowser ? window.APOLLO_STATE : {});

    return new ApolloClient({
      cache: apolloCache,
      link: new SchemaLink({ schema }),
    });
  };
}

export default setupClient;
