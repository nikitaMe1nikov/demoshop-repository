import React, { FC, useCallback, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'native-base';
import { stretch, stretchInPercent } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';

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
  productID: string;
  isLoading: boolean;
  deleteFromCart: (id: string) => void;
}

export const DeleteIcon: FC<DeleteIconProps> = ({
  style,
  productID,
  isLoading,
  deleteFromCart,
}) => {
  const onPress = useCallback(() => deleteFromCart(productID), [deleteFromCart, productID]);

  return (
    <View style={[styles.container, style]}>
      {isLoading ? (
        <ActivityIndicator style={stretch} color={platform.tabMenuActiveIconColor} />
      ) : (
        <Button style={stretchInPercent} icon transparent onPress={onPress}>
          <Icon type="MaterialCommunityIcons" name="close" style={styles.iconGrey} />
        </Button>
      )}
    </View>
  );
};

export default memo(DeleteIcon);
