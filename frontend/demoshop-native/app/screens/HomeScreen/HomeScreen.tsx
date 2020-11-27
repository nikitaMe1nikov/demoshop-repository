import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Container, Content, Title, Body } from 'native-base';
import { childrenCenter } from 'components/layoutStyles';
import { DashboardStore } from '@frontend/dashboard-store';
import BannerCard, { BannerCardLoading } from './BannerCard';
import Header from 'components/Header';

export function HomeScreen() {
  const { banners, isLoading } = useStore(DashboardStore);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>Home</Title>
        </Body>
      </Header>
      <Content>
        {isLoading ? (
          <BannerCardLoading />
        ) : (
          banners?.map((b) => <BannerCard key={b.name} banner={b} />)
        )}
      </Content>
    </Container>
  );
}

export default observer(HomeScreen);
