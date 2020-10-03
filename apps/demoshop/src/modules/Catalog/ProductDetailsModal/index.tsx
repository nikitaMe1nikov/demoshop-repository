import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CatalogStore from 'modules/Catalog/CatalogStore';
import ProductDetailsStore from 'modules/Catalog/ProductDetailsModal/ProductDetailsStore';
import UserStore from 'modules/Profile/UserStore';
import { DOL } from 'components/constants';
import FavoriteIcon from 'modules/Catalog/ProductCard/FavoriteIcon';
import ProductAmountButton from 'modules/Cart/ProductAmountButton';
import Skeleton from '@material-ui/lab/Skeleton';
import CartStore from 'modules/Cart/CartStore';

const useStyles = makeStyles({
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

const Container = withStyles({
  paper: {
    maxWidth: '680px',
  },
})(Dialog);

const Image = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  height: 260,
  width: 260,
}));

const DescriptionLoading: FC = () => <Skeleton variant="rect" height={200} />;

const ARIA_LABEL = 'product-details';

interface ProductDetailsModalProps {
  productID: string;
  open: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

export const ProductDetailsModal: FC<ProductDetailsModalProps> = ({
  productID,
  open,
  onClose,
  onExited,
}) => {
  const classes = useStyles();
  const { isLogin } = useStore(UserStore);
  const { description, isLoading } = useStore(ProductDetailsStore, { productID });
  const { productsMap, isLoadingFavorites, addFavorite, removeFavorite } = useStore(CatalogStore);
  const { productsMap: cartProductsMap } = useStore(CartStore);
  const { name, price, favorite } = productsMap.get(productID) || cartProductsMap.get(productID);
  const isLoadingFavorite = isLoadingFavorites.has(productID);

  return (
    <Container
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      onExited={onExited}
      aria-labelledby={ARIA_LABEL}
    >
      <DialogContent>
        <Box display="flex" flexDirection="row">
          <Box>
            <Image />
          </Box>
          <Box ml={2}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="h6" color="textSecondary">
              {price} {DOL}
            </Typography>
            <Box mt={2}>
              <ProductAmountButton productID={productID} />
            </Box>
          </Box>
        </Box>
        <Box minHeight={200} mb={1} mt={2}>
          {isLoading ? (
            <DescriptionLoading />
          ) : (
            <Typography variant="subtitle1">{description}</Typography>
          )}
        </Box>
        {isLogin && (
          <FavoriteIcon
            className={classes.favoriteIcon}
            isLoading={isLoadingFavorite}
            productID={productID}
            favorite={favorite}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}
      </DialogContent>
    </Container>
  );
};

export default observer(ProductDetailsModal);
