import { DocumentNode, GraphQLError } from 'graphql';
import { OperationVariables } from 'apollo-client';

export interface GQLPayload<D = any> {
  query: DocumentNode;
  variables?: OperationVariables;
  data?: D;
  errors?: ReadonlyArray<GraphQLError>;
}

export interface DelayActionPayload<P = any> {
  wait: number;
  nextAction: { type: string; payload?: P };
}

export type Variables = OperationVariables;
