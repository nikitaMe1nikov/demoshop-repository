import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3333/graphql`,
  options: {
    reconnect: true,
  },
});

const OPERATION_DEFINITION = 'OperationDefinition';
const SUBSCRIPTION = 'subscription';

function isSubscription(definition: ReturnType<typeof getMainDefinition>) {
  return definition.kind === OPERATION_DEFINITION && definition.operation === SUBSCRIPTION;
}

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    split(({ query }) => isSubscription(getMainDefinition(query)), wsLink, httpLink),
  ]),
  cache: new InMemoryCache(),
});

export default apolloClient;
