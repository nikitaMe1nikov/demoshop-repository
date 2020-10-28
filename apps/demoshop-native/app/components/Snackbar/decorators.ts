import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { createActionAndEffect } from '@nimel/directorr';
import { actionShowSnack as actionShow } from '@demo/snackbar';

export type ValueOfRecord<R> = R extends Record<any, infer T> ? T : never;

export const TYPE: { DANGER: 'danger'; SUCCESS: 'success'; WARNING: 'warning' } = {
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
};

export const POSITION: { TOP: 'top'; BOTTOM: 'bottom'; CENTER: 'center' } = {
  TOP: 'top',
  BOTTOM: 'bottom',
  CENTER: 'center',
};

export interface Options {
  text: string;
  buttonText?: string;
  position?: ValueOfRecord<typeof POSITION>;
  type?: ValueOfRecord<typeof TYPE>;
  duration?: number;
  onClose?: (reason: 'user' | 'timeout' | 'functionCall') => any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

export type SnackbarPayload = Options;

export const [actionShowSnack, effectShowSnack] = createActionAndEffect<SnackbarPayload>(
  actionShow.type
);
