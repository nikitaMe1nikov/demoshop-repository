import React, { FC } from 'react';
import Container from '@material-ui/core/Container';

export const Page: FC = ({ children }) => (
  <Container disableGutters maxWidth={false}>
    {children as any}
  </Container>
);

export default Page;
