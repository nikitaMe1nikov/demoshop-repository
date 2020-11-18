import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/icons/Favorite';
import { ProductModelType } from '@demo/mst-gql';

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
  product: ProductModelType;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({
  className,
  product: { toggleFavorite, favorite, isLoadingFavorite },
}) => {
  const classes = useStyles();

  return (
    <Box className={className}>
      <IconButton color="secondary" onClick={toggleFavorite}>
        {isLoadingFavorite ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <Icon className={favorite ? classes.iconRed : classes.iconGrey} />
        )}
      </IconButton>
    </Box>
  );
};

export default observer(FavoriteIcon);
