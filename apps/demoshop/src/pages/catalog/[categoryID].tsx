import React from 'react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Container from '@material-ui/core/Container';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import ProductsTitle from '@demoshop/components/Catalog/ProductsTitle';
import ProductsList from '@demoshop/components/Catalog/ProductsList';
import { ROOT_URL } from '@demo/url';
import NoSsr from '@material-ui/core/NoSsr';
import CategoryPanel from '@demoshop/components/Categories/CategoryPanel';
import ProductsPagination from '@demoshop/components/Catalog/ProductsPagination';

export const Products: DirectorrNextComponent = () => (
  <Page>
    <MainBar title="Catalog">
      <NoSsr>
        <CategoryPanel />
        <ProductsPagination />
      </NoSsr>
    </MainBar>
    <Container maxWidth="md">
      <ProductsTitle />
      <ProductsList />
    </Container>
  </Page>
);

Products.whenServerDirectorrError = (store, dir, { ctx }) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: ROOT_URL });
    ctx.res.end();
  }
};

export default Products;
