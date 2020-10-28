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
  iconRed: {
    color: platform.brandDanger,
  },
  iconGrey: {
    color: platform.brandLight,
  },
});

interface FavoriteIconProps {
  style?: StyleProp<ViewStyle>;
  productID: string;
  isLoading: boolean;
  favorite: boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({
  style,
  productID,
  isLoading,
  favorite,
  addFavorite,
  removeFavorite,
}) => {
  const onPress = useCallback(
    () => (favorite ? removeFavorite(productID) : addFavorite(productID)),
    [addFavorite, favorite, productID, removeFavorite]
  );

  return (
    <View style={[styles.container, style]}>
      {isLoading ? (
        <ActivityIndicator style={stretch} color={platform.tabMenuActiveIconColor} />
      ) : (
        <Button style={stretchInPercent} icon transparent onPress={onPress}>
          <Icon
            type="MaterialCommunityIcons"
            name="cards-heart"
            style={favorite ? styles.iconRed : styles.iconGrey}
          />
        </Button>
      )}
    </View>
  );
};

export default memo(FavoriteIcon);
