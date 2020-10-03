import React from 'react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Container from '@material-ui/core/Container';
import Page from 'components/Page';
import MainBar from 'modules/MainBar';
import CategoryPanel from 'modules/Categories/CategoryPanel';
import CatalogStore from 'modules/Catalog/CatalogStore';
import CategoriesStore from 'modules/Categories/CategoriesStore';
import CartStore from 'modules/Cart/CartStore';
import ProductsTitle from 'modules/Catalog/ProductsTitle';
import ProductsList from 'modules/Catalog/ProductsList';
import ProductsPagination from 'modules/Catalog/ProductsPagination';
import UserStore from 'modules/Profile/UserStore';
import { ROOT_URL } from 'config/url';

export const Products: DirectorrNextComponent = () => (
  <Page>
    <MainBar title="Catalog">
      <CategoryPanel />
      <ProductsPagination />
    </MainBar>
    <Container maxWidth="md">
      <ProductsTitle />
      <ProductsList />
    </Container>
  </Page>
);

Products.whenServerLoadDirectorr = (directorr) => {
  directorr.addStores(CatalogStore, CategoriesStore, CartStore, UserStore);
};

Products.whenServerDirectorrError = (store, dir, { ctx }) => {
  ctx.res.writeHead(302, { Location: ROOT_URL });
  ctx.res.end();
};

export default Products;
