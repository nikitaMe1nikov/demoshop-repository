import { createActionAndEffect } from '@nimel/directorr';
import { GQLPayload, DelayActionPayload } from './types';

export const [actionGQLQuery, effectGQLQuery] = createActionAndEffect<GQLPayload>('GQL.GET_QUERY');

export const [actionGQLQuerySuccess, effectGQLQuerySuccess] = createActionAndEffect<GQLPayload>(
  'GQL.GET_QUERY_SUCCESS'
);

export const [actionGQLQueryLoading, effectGQLQueryLoading] = createActionAndEffect<GQLPayload>(
  'GQL.GET_QUERY_LOADING'
);

export const [actionGQLQueryError, effectGQLQueryError] = createActionAndEffect<GQLPayload>(
  'GQL.GET_QUERY_ERROR'
);

export const [actionGQLMutation, effectGQLMutation] = createActionAndEffect<GQLPayload>(
  'GQL.MUTATE_QUERY'
);

export const [actionGQLMutationSuccess, effectGQLMutationSuccess] = createActionAndEffect<
  GQLPayload
>('GQL.MUTATE_QUERY_SUCCESS');

export const [actionGQLMutationLoading, effectGQLMutationLoading] = createActionAndEffect<
  GQLPayload
>('GQL.MUTATE_QUERY_LOADING');

export const [actionGQLMutationError, effectGQLMutationError] = createActionAndEffect<GQLPayload>(
  'GQL.MUTATE_QUERY_ERROR'
);

export const [actionGQLSubscription, effectGQLSubscription] = createActionAndEffect<GQLPayload>(
  'GQL.SUBSCRIPTION_QUERY'
);

export const [actionGQLSubscriptionSuccess, effectGQLSubscriptionSuccess] = createActionAndEffect<
  GQLPayload
>('GQL.SUBSCRIPTION_QUERY_SUCCESS');

export const [actionGQLSubscriptionError, effectGQLSubscriptionError] = createActionAndEffect<
  GQLPayload
>('GQL.SUBSCRIPTION_QUERY_ERROR');

export const [actionGQLResetCache, effectGQLResetCache] = createActionAndEffect('GQL.RESET_CACHE');
export const [actionGQLResetCacheSuccess, effectGQLResetCacheSuccess] = createActionAndEffect(
  'GQL.RESET_CACHE_SUCCESS'
);

export const [actionDelayAction, effectDelayAction] = createActionAndEffect<DelayActionPayload>(
  'GQL.DELAY_ACTION'
);
