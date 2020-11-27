import React from 'react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Container from '@material-ui/core/Container';
import Page from 'components/Page';
import MainBar from 'components/MainBar';
import ProductsTitle from 'components/Catalog/ProductsTitle';
import ProductsList from 'components/Catalog/ProductsList';
import { ROOT_URL } from '@frontend/url';
import NoSsr from '@material-ui/core/NoSsr';
import CategoryPanel from 'components/Categories/CategoryPanel';
import ProductsPagination from 'components/Catalog/ProductsPagination';

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
