import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import SnackbarContainer from './SnackbarContainer';

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

export const SnacksProvider: FC = () => (
  <SnackbarProvider
    maxSnack={5}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    classes={useStyles()}
  >
    <SnackbarContainer />
  </SnackbarProvider>
);

export default SnacksProvider;
