import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import platform from 'theme/variables/platform';

const styles = StyleSheet.create({
  image: {
    height: platform.getSize(50),
    width: '100%',
    backgroundColor: platform.skeletonBackgroundColor,
  },
});

export const Image: FC = () => <View style={styles.image} />;

export default Image;
