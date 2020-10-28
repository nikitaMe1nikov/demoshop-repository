import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Container, Content, Title, Body } from 'native-base';
import { childrenCenter } from '@demoshop-native/components/layoutStyles';
import { DashboardStore } from '@demo/dashboard-store';
import BannerCard, { BannerCardLoading } from './BannerCard';
import Header from '@demoshop-native/components/Header';

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
          banners.map((b) => <BannerCard key={b.name} banner={b} />)
        )}
      </Content>
    </Container>
  );
}

export default observer(HomeScreen);
