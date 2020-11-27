import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Card, CardItem, Text, H3, Body } from 'native-base';
import { stretch } from 'components/layoutStyles';
import { BannerModelType } from '@frontend/gql';
import platform from 'theme/variables/platform';
import LoadingRect from 'components/LoadingRect';

const styles = StyleSheet.create({
  image: { height: platform.getSize(30) },
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
  banner: BannerModelType;
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
