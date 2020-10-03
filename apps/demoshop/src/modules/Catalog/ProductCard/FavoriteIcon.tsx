import React, { FC, useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  iconGrey: {
    color: theme.palette.grey[300],
  },
  iconRed: {
    color: theme.palette.error.main,
  },
}));

interface FavoriteIconProps {
  className?: string;
  productID: string;
  isLoading: boolean;
  favorite: boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({
  className,
  productID,
  isLoading,
  favorite,
  addFavorite,
  removeFavorite,
}) => {
  const classes = useStyles();

  const onClick = useCallback(
    () => (favorite ? removeFavorite(productID) : addFavorite(productID)),
    [addFavorite, favorite, productID, removeFavorite]
  );

  return (
    <Box className={className}>
      <IconButton color="secondary" onClick={onClick}>
        {isLoading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <Icon className={favorite ? classes.iconRed : classes.iconGrey} />
        )}
      </IconButton>
    </Box>
  );
};

export default memo(FavoriteIcon);
