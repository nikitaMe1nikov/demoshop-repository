import React, { FC, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'native-base';
import { stretch, stretchInPercent } from 'components/layoutStyles';
import platform from 'theme/variables/platform';

const styles = StyleSheet.create({
  container: {
    width: platform.getSize(14),
    height: platform.getSize(14),
  },
  iconGrey: {
    color: platform.brandLight,
  },
});

interface DeleteIconProps {
  style?: StyleProp<ViewStyle>;
  isLoading: boolean;
  deleteFromCart: () => void;
}

export const DeleteIcon: FC<DeleteIconProps> = ({ style, isLoading, deleteFromCart }) => (
  <View style={[styles.container, style]}>
    {isLoading ? (
      <ActivityIndicator style={stretch} color={platform.tabMenuActiveIconColor} />
    ) : (
      <Button style={stretchInPercent} icon transparent onPress={deleteFromCart}>
        <Icon type="MaterialCommunityIcons" name="close" style={styles.iconGrey} />
      </Button>
    )}
  </View>
);

export default memo(DeleteIcon);
