import React, { FC, memo } from 'react';
import { DOL } from 'components/constants';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductCard from './ProductCard';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { OrderModelType } from '@frontend/gql';

export const OrderCardLoading: FC = () => <Skeleton variant="rect" height={354} />;

interface OrderCardProps {
  order: OrderModelType;
}

export const OrderCard: FC<OrderCardProps> = ({ order }) => (
  <Card variant="outlined">
    <CardHeader title={`Order № ${order.id}`} />
    <CardContent>
      <Grid container spacing={2}>
        {order.products.map((product) => (
          <Grid key={product.id} item xs={3}>
            <ProductCard
              product={product}
              total={order.totalByID?.filter((id) => id === product.id).length}
            />
          </Grid>
        ))}
      </Grid>
    </CardContent>
    <CardContent>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" color="textSecondary">
          {order.total}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">Price</Typography>
        <Typography variant="h6" color="textSecondary">
          {`${order.price} ${DOL}`}
        </Typography>
      </Box>
    </CardContent>
    <Box />
  </Card>
);

export default memo(OrderCard);
