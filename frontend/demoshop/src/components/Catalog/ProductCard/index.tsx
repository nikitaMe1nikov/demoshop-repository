import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductAmountButton from 'components/Cart/ProductAmountButton';
import FavoriteIcon from 'components/Catalog/ProductCard/FavoriteIcon';
import { DOL } from 'components/constants';
import { ProductModelType } from '@frontend/gql';
import ProductDetailsModal from 'components/Catalog/ProductDetailsModal';
import { UserStore } from '@frontend/user-store';
import { ModalBoxStore } from '@frontend/modal-box';

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
  product: ProductModelType;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const classes = useStyles();
  const { isLogin } = useStore(UserStore);
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
        <ProductAmountButton product={product} />
      </CardActions>
      {isLogin && <FavoriteIcon className={classes.favoriteIcon} product={product} />}
    </Card>
  );
};

export default observer(ProductCard);
