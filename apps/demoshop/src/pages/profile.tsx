import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useStore } from '@nimel/directorr-react';
import { DirectorrNextComponent } from '@nimel/directorr-next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from '@demoshop/components/Page';
import MainBar from '@demoshop/components/MainBar';
import { UserStore } from '@demo/user-store';
import TextInput from '@demoshop/components/TextInput';
import { ProfileStore } from '@demo/profile-store';
import ButtonLoading from '@demoshop/components/ButtonLoading';
import { ROOT_URL } from '@demo/url';

const useStyles = makeStyles({
  saveButton: {
    width: 100,
  },
  logoutButton: {
    width: 100,
  },
});

export const ProfileLoading: FC = () => <Skeleton variant="rect" height={354} />;

const Image = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  height: 260,
}));

export const Profile: DirectorrNextComponent = () => {
  const classes = useStyles();
  const { isLoading, user } = useStore(UserStore);
  const {
    email,
    name,
    surname,
    logout,
    saveProfile,
    isLoadingSaveProfile,
    isLoadingLogout,
  } = useStore(ProfileStore);

  return (
    <Page>
      <MainBar title="Profile" />
      <Container maxWidth="md">
        <Box my={2}>
          {isLoading ? (
            <ProfileLoading />
          ) : (
            <Card variant="outlined">
              <Image />
              <CardHeader title={`${user?.name} ${user?.surname}`} />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box display="flex" flexDirection="column" flex={1}>
                    <TextInput
                      autoFocus
                      name="name"
                      margin="normal"
                      label="Name"
                      store={name}
                      required
                    />
                    <TextInput margin="normal" name="surname" label="Surname" store={surname} />
                  </Box>
                  <Box display="flex" flexDirection="column" flex={1} ml={2}>
                    <TextInput
                      autoFocus
                      name="email"
                      margin="normal"
                      label="Email Address"
                      type="email"
                      store={email}
                      required
                    />
                  </Box>
                </Box>
              </CardContent>
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <CardActions>
                  <ButtonLoading
                    className={classes.saveButton}
                    aria-label="save profile"
                    isLoading={isLoadingSaveProfile}
                    size="large"
                    color="primary"
                    onClick={saveProfile}
                  >
                    save
                  </ButtonLoading>
                  <ButtonLoading
                    className={classes.logoutButton}
                    aria-label="save profile"
                    isLoading={isLoadingLogout}
                    size="large"
                    color="primary"
                    onClick={logout}
                  >
                    logout
                  </ButtonLoading>
                </CardActions>
              </Box>
            </Card>
          )}
        </Box>
      </Container>
    </Page>
  );
};

Profile.whenServerDirectorrReady = (directorr, { ctx }) => {
  const userStore = directorr.getStore(UserStore);

  if (userStore?.isAnonim && ctx.res) {
    ctx.res.writeHead(302, { Location: ROOT_URL });
    ctx.res.end();
  }
};

export default observer(Profile);
