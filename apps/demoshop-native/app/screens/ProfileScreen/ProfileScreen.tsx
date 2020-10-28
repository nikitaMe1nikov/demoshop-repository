import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Content, Title, Card, Body } from 'native-base';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet } from 'react-native';
import { childrenCenter } from '@demoshop-native/components/layoutStyles';
import { UserStore } from '@demo/user-store';
import platform from '@demoshop-native/theme/variables/platform';
import Header from '@demoshop-native/components/Header';
import AnonimForm from './AnonimForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SaveForm from './SaveForm';

const styles = StyleSheet.create({
  loading: {
    height: platform.getSize(50),
    flex: 1,
    backgroundColor: platform.skeletonBackgroundColor,
    margin: 0,
  },
});

export const ProfileLoading: FC = () => <Card style={styles.loading} />;

export const ProfileScreen: FC = () => {
  const { isLoading, isLogin } = useStore(UserStore);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>Profile</Title>
        </Body>
      </Header>
      <Content>
        {isLoading ? (
          <ProfileLoading />
        ) : (
          <>
            {!isLogin && <AnonimForm />}
            {!isLogin && <LoginForm />}
            {!isLogin && <SignupForm />}
            {isLogin && <SaveForm />}
          </>
        )}
      </Content>
    </Container>
  );
};

export default observer(ProfileScreen);
