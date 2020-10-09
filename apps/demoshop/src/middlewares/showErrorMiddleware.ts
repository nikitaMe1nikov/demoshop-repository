import { Action, Next, DirectorrInterface, createAction } from '@nimel/directorr';
import {
  actionGQLQueryError,
  actionGQLMutationError,
  actionGQLSubscriptionError,
  GQLPayload,
} from '@demo/sagas';
import { actionShowErrorSnack } from '@demo/snackbar-store';

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
    action.type === actionGQLQueryError.type ||
    action.type === actionGQLMutationError.type ||
    action.type === actionGQLSubscriptionError.type
  ) {
    action.payload.errors.map((error) =>
      store.dispatch(
        createAction(actionShowErrorSnack.type, {
          message: calcMessage(error),
          options: OPTIONS,
        })
      )
    );
  }
}
