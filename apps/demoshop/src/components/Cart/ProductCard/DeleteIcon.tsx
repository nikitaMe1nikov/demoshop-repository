import React, { FC, useCallback, memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/icons/Close';

interface FavoriteIconProps {
  className?: string;
  productID: string;
  isLoading: boolean;
  deleteFromCart: (id: string) => void;
}

export const DeleteIcon: FC<FavoriteIconProps> = ({
  className,
  productID,
  isLoading,
  deleteFromCart,
}) => {
  const onClick = useCallback(() => deleteFromCart(productID), [deleteFromCart, productID]);

  return (
    <Box className={className}>
      <IconButton color="secondary" onClick={onClick}>
        {isLoading ? <CircularProgress size={24} color="secondary" /> : <Icon />}
      </IconButton>
    </Box>
  );
};

export default memo(DeleteIcon);
