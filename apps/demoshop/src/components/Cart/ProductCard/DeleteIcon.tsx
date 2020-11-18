import React, { FC, memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/icons/Close';

interface FavoriteIconProps {
  className?: string;
  isLoading: boolean;
  deleteFromCart: () => void;
}

export const DeleteIcon: FC<FavoriteIconProps> = ({ className, isLoading, deleteFromCart }) => (
  <Box className={className}>
    <IconButton color="secondary" onClick={deleteFromCart}>
      {isLoading ? <CircularProgress size={24} color="secondary" /> : <Icon />}
    </IconButton>
  </Box>
);

export default memo(DeleteIcon);
