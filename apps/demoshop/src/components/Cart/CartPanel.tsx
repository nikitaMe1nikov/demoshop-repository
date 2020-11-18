import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { DOL } from '@demoshop/components/constants';
import ButtonLoading from '@demoshop/components/ButtonLoading';
import { CartStore } from '@demo/cart-store';

export const CartPanel: FC = () => {
  const { price, total, discount, isEmpty, fillCart, isLoadingFill } = useStore(CartStore);

  if (isEmpty) {
    return (
      <Card variant="outlined">
        <CardHeader title="Корзина" subheader="Корзина сейчас пуста" />
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Корзина" />
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">Количество товаров</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {total}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">Скидка</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {discount}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h5">Общая сумма</Typography>
          <Typography variant="h5">{`${price} ${DOL}`}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" flexDirection="row" flexGrow={1} justifyContent="flex-end">
          <ButtonLoading
            aria-label="fill cart"
            color="secondary"
            size="large"
            isLoading={isLoadingFill}
            onClick={fillCart}
          >
            оформить
          </ButtonLoading>
        </Box>
      </CardActions>
    </Card>
  );
};

export default observer(CartPanel);
