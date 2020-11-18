import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import Grid from '@material-ui/core/Grid';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import OrderCard, { OrderCardLoading } from '@demoshop/components/Orders/OrderCard';
import { OrdersStore } from '@demo/orders-store';

export const Orders = () => {
  const { orders, isLoading } = useStore(OrdersStore);

  return (
    <Page>
      <MainBar title="Orders" />
      <Container maxWidth="md">
        <Box my={2}>
          <Grid container spacing={2} direction="column">
            {isLoading ? (
              <Grid item>
                <OrderCardLoading />
              </Grid>
            ) : (
              orders?.map((o) => (
                <Grid key={o.id} item>
                  <OrderCard order={o} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default observer(Orders);
