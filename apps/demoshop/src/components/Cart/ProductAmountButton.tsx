import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CartStore, Product } from '@demo/cart-store';
import { EMPTY_OBJECT } from '@demoshop/utils/constants';
import i18n from '@demo/i18n';

interface ProductAmountButtonProps {
  productID: string;
  className?: string;
  addToCartTittle?: string;
}

export const ProductAmountButton: FC<ProductAmountButtonProps> = ({
  className,
  productID,
  addToCartTittle = i18n.addInCart,
}) => {
  const { productsMap, addToCart, removeFromCart, isLoadingChange } = useStore(CartStore);
  const { amount } = productsMap.get(productID) || (EMPTY_OBJECT as Product);
  const isLoading = isLoadingChange.has(productID);

  const addAmount = useCallback(() => addToCart(productID), [addToCart, productID]);
  const removeAmount = useCallback(() => removeFromCart(productID), [productID, removeFromCart]);

  return (
    <Box display="flex" flexDirection="row" width="100%" height="48px" className={className}>
      {amount || isLoading ? (
        <>
          <IconButton aria-label="remove to cart" color="secondary" onClick={removeAmount}>
            <RemoveIcon />
          </IconButton>
          <Box display="flex" flexGrow={1} justifyContent="center" alignItems="center">
            {isLoading ? (
              <CircularProgress size={28} color="secondary" />
            ) : (
              <Typography variant="subtitle1">{amount}</Typography>
            )}
          </Box>
          <IconButton aria-label="add to cart" color="secondary" onClick={addAmount}>
            <AddIcon />
          </IconButton>
        </>
      ) : (
        <Button
          aria-label="add to cart"
          fullWidth
          color="secondary"
          size="large"
          onClick={addAmount}
        >
          {addToCartTittle}
        </Button>
      )}
    </Box>
  );
};

export default observer(ProductAmountButton);
