import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';

export const PageNotFound: DirectorrNextComponent<{ statusCode: number | null }> = ({
  statusCode,
}) => (
  <Page>
    <MainBar title="Catalog" />
    <Container maxWidth="md">
      <Box my={2} display="flex" height="100%" alignItems="center" justifyContent="center">
        <Typography variant="h3">Some error - {statusCode}</Typography>
      </Box>
    </Container>
  </Page>
);

PageNotFound.getInitialProps = ({ res, err }) => {
  if (res) {
    return { statusCode: res.statusCode };
  } else if (err) {
    return { statusCode: err.statusCode };
  } else {
    return { statusCode: null };
  }
};

export default PageNotFound;
