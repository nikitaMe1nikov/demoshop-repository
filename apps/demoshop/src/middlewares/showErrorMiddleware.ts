import { Action, Next, DirectorrInterface, createAction } from '@nimel/directorr';
import { GET_QUERY_ERROR, MUTATE_QUERY_ERROR, SUBSCRIPTION_QUERY_ERROR } from 'sagas/constants';
import { SNACKBAR_SHOW_ERROR } from 'modules/Snackbar/decorators';
import { GQLPayload } from 'sagas/types';

function calcMessage(error: any) {
  if (error.networkError) return 'network error';

  return error.message.message || error.message;
}

const OPTIONS = {
  preventDuplicate: true,
};

export default function showErrorMiddleware(
  action: Action<string, GQLPayload>,
  next: Next,
  store: DirectorrInterface
) {
  next(action);

  if (
    action.type === GET_QUERY_ERROR ||
    action.type === MUTATE_QUERY_ERROR ||
    action.type === SUBSCRIPTION_QUERY_ERROR
  ) {
    action.payload.errors.map((error) =>
      store.dispatch(
        createAction(SNACKBAR_SHOW_ERROR, {
          message: calcMessage(error),
          options: OPTIONS,
        })
      )
    );
  }
}
