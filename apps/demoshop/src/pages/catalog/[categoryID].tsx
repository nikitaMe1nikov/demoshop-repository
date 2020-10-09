import React from 'react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Container from '@material-ui/core/Container';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import CategoryPanel from '@demoshop/components/Categories/CategoryPanel';
import { CatalogStore } from '@demo/catalog-store';
import { CategoriesStore } from '@demo/categories-store';
import { CartStore } from '@demo/cart-store';
import ProductsTitle from '@demoshop/components/Catalog/ProductsTitle';
import ProductsList from '@demoshop/components/Catalog/ProductsList';
import ProductsPagination from '@demoshop/components/Catalog/ProductsPagination';
import { UserStore } from '@demo/user-store';
import { ROOT_URL } from '@demo/url';

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
