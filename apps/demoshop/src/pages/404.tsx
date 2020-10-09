import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';

export const PageNotFound: FC = () => (
  <Page>
    <MainBar title="Catalog" />
    <Container maxWidth="md">
      <Box my={2} display="flex" height="100%" alignItems="center" justifyContent="center">
        <Typography variant="h3">Page not found</Typography>
      </Box>
    </Container>
  </Page>
);

export default PageNotFound;
