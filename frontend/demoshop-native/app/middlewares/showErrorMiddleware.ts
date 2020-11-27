import { Action, Next, DirectorrInterface } from '@nimel/directorr';
import {
  actionGQLQueryError,
  actionGQLMutationError,
  actionGQLSubscriptionError,
  GQLPayload,
} from '@frontend/sagas';
import { actionShowErrorSnack } from '@frontend/snackbar';

function calcMessage(error: any) {
  if (error.networkError) return 'network error';

  return error.message.message || error.message;
}

export function showErrorSnackMiddleware(
  action: Action<string, GQLPayload>,
  next: Next,
  store: DirectorrInterface
) {
  next(action);

  if (
    action.type === actionGQLQueryError.type ||
    action.type === actionGQLMutationError.type ||
    action.type === actionGQLSubscriptionError.type
  ) {
    action.payload.errors.map((error) =>
      store.dispatchType(actionShowErrorSnack.type, {
        message: calcMessage(error),
      })
    );
  }
}
