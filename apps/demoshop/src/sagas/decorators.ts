import { createActionAndEffect } from '@nimel/directorr';
import {
  GET_QUERY,
  GET_QUERY_SUCCESS,
  GET_QUERY_ERROR,
  GET_QUERY_LOADING,
  MUTATE_QUERY,
  MUTATE_QUERY_SUCCESS,
  MUTATE_QUERY_ERROR,
  MUTATE_QUERY_LOADING,
  SUBSCRIPTION_QUERY,
  SUBSCRIPTION_QUERY_SUCCESS,
  SUBSCRIPTION_QUERY_ERROR,
  RESET_CACHE,
  RESET_CACHE_SUCCESS,
  DELAY_ACTION,
} from './constants';
import { GQLPayload, DelayActionPayload } from './types';

export const [actionGQLQuery, effectGQLQuery] = createActionAndEffect<GQLPayload>(GET_QUERY);

export const [actionGQLQuerySuccess, effectGQLQuerySuccess] = createActionAndEffect<GQLPayload>(
  GET_QUERY_SUCCESS
);

export const [actionGQLQueryLoading, effectGQLQueryLoading] = createActionAndEffect<GQLPayload>(
  GET_QUERY_LOADING
);

export const [actionGQLQueryError, effectGQLQueryError] = createActionAndEffect<GQLPayload>(
  GET_QUERY_ERROR
);

export const [actionGQLMutation, effectGQLMutation] = createActionAndEffect<GQLPayload>(
  MUTATE_QUERY
);

export const [actionGQLMutationSuccess, effectGQLMutationSuccess] = createActionAndEffect<
  GQLPayload
>(MUTATE_QUERY_SUCCESS);

export const [actionGQLMutationLoading, effectGQLMutationLoading] = createActionAndEffect<
  GQLPayload
>(MUTATE_QUERY_LOADING);

export const [actionGQLMutationError, effectGQLMutationError] = createActionAndEffect<GQLPayload>(
  MUTATE_QUERY_ERROR
);

export const [actionGQLSubscription, effectGQLSubscription] = createActionAndEffect<GQLPayload>(
  SUBSCRIPTION_QUERY
);

export const [actionGQLSubscriptionSuccess, effectGQLSubscriptionSuccess] = createActionAndEffect<
  GQLPayload
>(SUBSCRIPTION_QUERY_SUCCESS);

export const [actionGQLSubscriptionError, effectGQLSubscriptionError] = createActionAndEffect<
  GQLPayload
>(SUBSCRIPTION_QUERY_ERROR);

export const [actionGQLResetCache, effectGQLResetCache] = createActionAndEffect(RESET_CACHE);
export const [actionGQLResetCacheSuccess, effectGQLResetCacheSuccess] = createActionAndEffect(
  RESET_CACHE_SUCCESS
);

export const [actionDelayAction, effectDelayAction] = createActionAndEffect<DelayActionPayload>(
  DELAY_ACTION
);
