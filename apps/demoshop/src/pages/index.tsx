import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import Page from '@demoshop/components/Page';
import NoSsr from '@material-ui/core/NoSsr';
import CategoryPanel from '@demoshop/components/Categories/CategoryPanel';
import MainBar from '@demoshop/components/MainBar';
import BannerCard, { BannerCardLoading } from '@demoshop/components/Dashboard/BannerCard';
import FavoriteProductsGrid from '@demoshop/components/Dashboard/FavoriteProductsGrid';
import { DashboardStore } from '@demo/dashboard-store';
import { UserStore } from '@demo/user-store';

export const Dashboard: DirectorrNextComponent = () => {
  const { isLoading, banners } = useStore(DashboardStore);
  const { isLogin } = useStore(UserStore);

  return (
    <Page>
      <MainBar title="Catalog">
        <NoSsr>
          <CategoryPanel />
        </NoSsr>
      </MainBar>
      <Container maxWidth="md">
        <Box my={2}>
          <Grid container spacing={2} direction="column">
            {isLoading ? (
              <Grid item>
                <BannerCardLoading />
              </Grid>
            ) : (
              banners?.map((b) => (
                <Grid key={b.id} item>
                  <BannerCard banner={b} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        {!isLoading && isLogin && <FavoriteProductsGrid />}
      </Container>
    </Page>
  );
};

export default observer(Dashboard);
