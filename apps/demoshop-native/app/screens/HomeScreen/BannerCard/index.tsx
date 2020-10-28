import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Card, CardItem, Text, H3, Body } from 'native-base';
import { stretch } from '@demoshop-native/components/layoutStyles';
import { Banner } from '@demo/dashboard-store';
import platform from '@demoshop-native/theme/variables/platform';
import LoadingRect from '@demoshop-native/components/LoadingRect';

const styles = StyleSheet.create({
  image: { height: platform.getSize(30), width: null },
});

export const BannerCardLoading: FC = () => (
  <Card>
    <CardItem cardBody>
      <LoadingRect height={platform.getSize(26)} />
    </CardItem>
    <CardItem>
      <LoadingRect height={platform.getSize(4)} />
    </CardItem>
    <CardItem>
      <LoadingRect height={platform.getSize(4)} />
    </CardItem>
  </Card>
);

interface BannerCardProps {
  banner: Banner;
}

export const BannerCard: FC<BannerCardProps> = ({ banner }) => (
  <Card>
    <CardItem cardBody>
      <Image source={{ uri: banner.images.big }} style={[stretch, styles.image]} />
    </CardItem>
    <CardItem>
      <Body>
        <H3>{banner.name}</H3>
        <Text>{banner.description}</Text>
      </Body>
    </CardItem>
  </Card>
);

export default memo(BannerCard);
