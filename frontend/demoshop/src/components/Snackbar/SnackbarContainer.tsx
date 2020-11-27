import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Snackbars from './Snackbars';

const useStyles = makeStyles((theme) => ({
  variantSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  variantError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
  variantWarning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  },
  variantInfo: { backgroundColor: theme.palette.info.main, color: theme.palette.common.white },
}));

export const SnackbarContainer: FC = () => (
  <SnackbarProvider
    maxSnack={5}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    classes={useStyles()}
  >
    <Snackbars />
  </SnackbarProvider>
);

export default SnackbarContainer;
