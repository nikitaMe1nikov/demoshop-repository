import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Grid from '@material-ui/core/Grid';
import Page from 'components/Page';
import MainBar from 'modules/MainBar';
import CategoryPanel from 'modules/Categories/CategoryPanel';
import BannerCard, { BannerCardLoading } from 'modules/Dashboard/BannerCard';
import FavoriteProductsGrid from 'modules/Dashboard/FavoriteProductsGrid';
import DashboardStore from 'modules/Dashboard/DashboardStore';
import CategoriesStore from 'modules/Categories/CategoriesStore';
import CartStore from 'modules/Cart/CartStore';
import UserStore from 'modules/Profile/UserStore';

export const Dashboard: DirectorrNextComponent = () => {
  const { banners, isLoading } = useStore(DashboardStore);
  const { isLogin } = useStore(UserStore);

  return (
    <Page>
      <MainBar title="Catalog">
        <CategoryPanel />
      </MainBar>
      <Container maxWidth="md">
        <Box my={2}>
          <Grid container spacing={2} direction="column">
            {isLoading ? (
              <Grid item>
                <BannerCardLoading />
              </Grid>
            ) : (
              banners.map((b) => (
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

Dashboard.whenServerLoadDirectorr = (directorr) => {
  directorr.addStores(DashboardStore, CategoriesStore, CartStore, UserStore);
};

export default observer(Dashboard);
