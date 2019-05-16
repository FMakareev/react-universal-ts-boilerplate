import * as redux from 'redux';
import { DocumentNode } from 'graphql';

declare module 'redux' {
  export type GenericStoreEnhancer = redux.StoreEnhancer;
}

declare const isBrowser: boolean;

declare module '*.graphqls' {
  const value: DocumentNode;
  export default value;
}

declare module '*.graphql' {
  const value: DocumentNode;
  export default value;
}
