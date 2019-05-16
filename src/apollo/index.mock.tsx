/** Apollo Client Mock */
import { setupClient } from './helpers/apolloClientMock';

/** Schema */

// @ts-ignore
import schemaGraphqls from './schema.graphqls';

export interface IMockResolvers {
  Query(): any;
  Mutation(): any;
}

const defaultMocks: IMockResolvers = {
  Query: () => ({}),
  Mutation: () => ({}),
};

export const indexMock = setupClient(defaultMocks, schemaGraphqls)();

export default indexMock;
