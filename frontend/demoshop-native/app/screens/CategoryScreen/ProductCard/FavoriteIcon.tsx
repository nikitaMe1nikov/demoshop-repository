import React, { FC, memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'native-base';
import { stretch, stretchInPercent } from 'components/layoutStyles';
import platform from 'theme/variables/platform';
import { ProductModelType } from '@frontend/gql';

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
  product: ProductModelType;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({
  style,
  product: { toggleFavorite, favorite, isLoadingFavorite },
}) => (
  <View style={[styles.container, style]}>
    {isLoadingFavorite ? (
      <ActivityIndicator style={stretch} color={platform.tabMenuActiveIconColor} />
    ) : (
      <Button style={stretchInPercent} icon transparent onPress={toggleFavorite}>
        <Icon
          type="MaterialCommunityIcons"
          name="cards-heart"
          style={favorite ? styles.iconRed : styles.iconGrey}
        />
      </Button>
    )}
  </View>
);

export default memo(FavoriteIcon);
