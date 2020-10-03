import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  label: (isLoading) =>
    isLoading && {
      visibility: 'hidden',
    },
  startIcon: (isLoading) =>
    isLoading && {
      position: 'absolute',
      visibility: 'visible',
      margin: 0,
    },
});

type ButtonLoadingProps = ButtonProps & {
  isLoading?: boolean;
};

export const ButtonLoading: FC<ButtonLoadingProps> = ({
  isLoading,
  children,
  onClick,
  ...rest
}) => (
  <Button
    classes={useStyles(isLoading)}
    startIcon={
      isLoading && (
        <Box>
          <CircularProgress size={18} color="secondary" />
        </Box>
      )
    }
    {...rest}
    onClick={isLoading ? undefined : onClick}
  >
    {children}
  </Button>
);

export default ButtonLoading;
