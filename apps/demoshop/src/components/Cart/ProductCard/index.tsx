import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ProductAmountButton from '@demoshop/components/Cart/ProductAmountButton';
import { ModalBoxStore } from '@demo/modal-box';
import { DOL } from '@demoshop/components/constants';
import { ProductModelType } from '@demo/mst-gql';
import ProductDetailsModal from '@demoshop/components/Catalog/ProductDetailsModal';
import DeleteIcon from './DeleteIcon';

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
  product: ProductModelType;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const classes = useStyles();
  const { open } = useStore(ModalBoxStore);
  const onClickImage = () => open(ProductDetailsModal, { product });

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
        <ProductAmountButton product={product} addToCartTittle={REVERT_TO_CART_TITTLE} />
      </CardActions>
      <DeleteIcon
        className={classes.favoriteIcon}
        isLoading={product.isLoadingDelete}
        deleteFromCart={product.deleteFromCart}
      />
    </Card>
  );
};

export default observer(ProductCard);
