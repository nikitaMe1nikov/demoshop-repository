import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductModelType } from '@demo/mst-gql';
import i18n from '@demo/i18n';

interface ProductAmountButtonProps {
  product: ProductModelType;
  className?: string;
  addToCartTittle?: string;
}

export const ProductAmountButton: FC<ProductAmountButtonProps> = ({
  className,
  product: { amount, isLoadingAmount, addToCart, removeFromCart },
  addToCartTittle = i18n.addInCart,
}) => (
  <Box display="flex" flexDirection="row" width="100%" height="48px" className={className}>
    {amount || isLoadingAmount ? (
      <>
        <IconButton aria-label="remove to cart" color="secondary" onClick={removeFromCart}>
          <RemoveIcon />
        </IconButton>
        <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
          {isLoadingAmount ? (
            <CircularProgress size={28} color="secondary" />
          ) : (
            <Typography variant="subtitle1">{amount}</Typography>
          )}
        </Box>
        <IconButton aria-label="add to cart" color="secondary" onClick={addToCart}>
          <AddIcon />
        </IconButton>
      </>
    ) : (
      <Button aria-label="add to cart" fullWidth color="secondary" size="large" onClick={addToCart}>
        {addToCartTittle}
      </Button>
    )}
  </Box>
);

export default observer(ProductAmountButton);
