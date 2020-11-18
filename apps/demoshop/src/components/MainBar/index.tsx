import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { useStore } from '@nimel/directorr-react';
import { ROOT_URL } from '@demo/url';
import NotificationIcon from '@demoshop/components/MainBar/NotificationIcon';
import { UserStore } from '@demo/user-store';
import UserIcon from './UserIcon';
import CartIcon from './CartIcon';
import OrdersIcon from './OrdersIcon';

interface MainBarProps {
  title?: string;
  titleURL?: string;
}

export const MainBar: FC<MainBarProps> = ({ children, title, titleURL = ROOT_URL }) => {
  const { isLogin } = useStore(UserStore);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="md">
          <Grid container direction="row">
            <Grid item container alignItems="center" xs>
              <Link href={titleURL}>
                <a>
                  <Typography align="center" variant="h6" noWrap>
                    {title}
                  </Typography>
                </a>
              </Link>
            </Grid>
            <Grid item>
              <CartIcon />
              {isLogin && <NotificationIcon />}
              {isLogin && <OrdersIcon />}
              <UserIcon />
            </Grid>
          </Grid>
          {children}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default observer(MainBar);
