import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { useSnackbar } from 'notistack';
import { SnackbarStore } from '@demo/snackbar-store';

export const Snackbars: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { snacks, clear } = useStore(SnackbarStore);

  useEffect(() => {
    snacks.forEach(({ message, options, key }) =>
      key ? closeSnackbar(key) : enqueueSnackbar(message, options)
    );

    clear();
  }, [clear, closeSnackbar, enqueueSnackbar, snacks, snacks.length]);

  return null;
};

export default observer(Snackbars);
