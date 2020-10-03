import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductAmountButton from 'modules/Cart/ProductAmountButton';
import FavoriteIcon from 'modules/Catalog/ProductCard/FavoriteIcon';
import { DOL } from 'components/constants';
import { Product } from 'modules/Catalog/CatalogStore';

export const HEIGHT = 323;

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export const ProductCardLoading: FC = () => (
  <Box height={307}>
    <Skeleton variant="rect" height="100%" />
  </Box>
);

const Image = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  height: 160,
  cursor: 'pointer',
}));

interface ProductCardProps {
  productID: string;
  isLogin: boolean;
  productsMap: Map<string, Product>;
  isLoadingFavorites: Map<string, null>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  onOpenModal: (id: string) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  productID,
  productsMap,
  isLoadingFavorites,
  addFavorite,
  removeFavorite,
  isLogin,
  onOpenModal,
}) => {
  const classes = useStyles();
  const { name, price, favorite } = productsMap.get(productID);
  const isLoading = isLoadingFavorites.has(productID);
  const onClickImage = useCallback(() => onOpenModal(productID), [onOpenModal, productID]);

  return (
    <Card className={classes.container} variant="outlined">
      <Image onClick={onClickImage} />
      <CardContent>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {price} {DOL}
        </Typography>
      </CardContent>
      <CardActions>
        <ProductAmountButton productID={productID} />
      </CardActions>
      {isLogin && (
        <FavoriteIcon
          className={classes.favoriteIcon}
          isLoading={isLoading}
          productID={productID}
          favorite={favorite}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
    </Card>
  );
};

export default observer(ProductCard);
