import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles } from '@material-ui/core/styles';
import TextField, {
  StandardTextFieldProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
} from '@material-ui/core/TextField';
import { FormStore } from '@nimel/directorr-form';

const ENTER_CODE = 13;

export const TextFieldCustom = withStyles({
  root: {
    position: 'relative',
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '100%',
      left: '0',
    },
  },
})(TextField);

type TextInputProps = (
  | Omit<
      StandardTextFieldProps,
      'value' | 'helperText' | 'error' | 'onChange' | 'onKeyDown' | 'onFocus' | 'onBlur'
    >
  | Omit<
      FilledTextFieldProps,
      'value' | 'helperText' | 'error' | 'onChange' | 'onKeyDown' | 'onFocus' | 'onBlur'
    >
  | Omit<
      OutlinedTextFieldProps,
      'value' | 'helperText' | 'error' | 'onChange' | 'onKeyDown' | 'onFocus' | 'onBlur'
    >
) & {
  store: FormStore;
};

const TextInput: FC<TextInputProps> = ({ store, ...props }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store.changeValue(e.target.value.trim());
    },
    [store]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === ENTER_CODE) store.submit();
    },
    [store]
  );

  return (
    <TextFieldCustom
      {...props}
      value={store.value}
      onChange={handleChange}
      onFocus={store.focus}
      onBlur={store.blur}
      onKeyDown={handleKeyDown}
      helperText={store.message}
      error={store.isInvalid}
    />
  );
};

export default observer(TextInput);
