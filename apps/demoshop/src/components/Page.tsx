import React from 'react';
import Container from '@material-ui/core/Container';

export const Page = ({ children }) => (
  <Container disableGutters maxWidth={false}>
    {children}
  </Container>
);

export default Page;
