import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ProductAmountButton from 'modules/Cart/ProductAmountButton';
import DeleteIcon from './DeleteIcon';
import { DOL } from 'components/constants';
import { Product } from 'modules/Cart/CartStore';

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

const REVERT_TO_CART_TITTLE = 'back in cart';

const Image = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  height: 160,
  cursor: 'pointer',
}));

interface ProductCardProps {
  productID: string;
  productsMap: Map<string, Product>;
  isLoadingDeleting: Map<string, null>;
  onOpenModal: (id: string) => void;
  deleteFromCart: (id: string) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  productID,
  productsMap,
  onOpenModal,
  isLoadingDeleting,
  deleteFromCart,
}) => {
  const classes = useStyles();
  const product = productsMap.get(productID);
  const isLoading = isLoadingDeleting.has(productID);
  const onClickImage = useCallback(() => onOpenModal(productID), [onOpenModal, productID]);

  return (
    <Card className={classes.container} variant="outlined">
      <Image onClick={onClickImage} />
      <CardContent>
        <Typography variant="subtitle1">{product.name}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {product.price} {DOL}
        </Typography>
      </CardContent>
      <CardActions>
        <ProductAmountButton productID={productID} addToCartTittle={REVERT_TO_CART_TITTLE} />
      </CardActions>
      <DeleteIcon
        className={classes.favoriteIcon}
        isLoading={isLoading}
        productID={productID}
        deleteFromCart={deleteFromCart}
      />
    </Card>
  );
};

export default observer(ProductCard);
