import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CatalogStore } from '@demo/catalog-store';
import { ProductModelType } from '@demo/mst-gql';
import { UserStore } from '@demo/user-store';
import { DOL } from '@demoshop/components/constants';
import FavoriteIcon from '@demoshop/components/Catalog/ProductCard/FavoriteIcon';
import ProductAmountButton from '@demoshop/components/Cart/ProductAmountButton';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  amountButton: {
    width: 8 * 20,
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
  product: ProductModelType;
  open: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

export const ProductDetailsModal: FC<ProductDetailsModalProps> = ({
  product,
  open,
  onClose,
  onExited,
}) => {
  const classes = useStyles();
  const { isLogin } = useStore(UserStore);
  const { getProduct } = useStore(CatalogStore);
  const { id, name, price, description } = product;

  useEffect(() => {
    if (!description) getProduct(id);
  }, [id, description, getProduct]);

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
              <ProductAmountButton className={classes.amountButton} product={product} />
            </Box>
          </Box>
        </Box>
        <Box minHeight={200} mb={1} mt={2}>
          {!description ? (
            <DescriptionLoading />
          ) : (
            <Typography variant="subtitle1">{description}</Typography>
          )}
        </Box>
        {isLogin && <FavoriteIcon className={classes.favoriteIcon} product={product} />}
      </DialogContent>
    </Container>
  );
};

export default observer(ProductDetailsModal);
