import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { childrenCenter } from '@demoshop-native/components/layoutStyles';
import {
  Container,
  Content,
  List,
  Title,
  Body,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
} from 'native-base';
import { useStore } from '@nimel/directorr-react';
import Header from '@demoshop-native/components/Header';
import LoadingRect from '@demoshop-native/components/LoadingRect';
import CategoriesScreenStore, { Category } from './CategoriesScreen.store';
import platform from '@demoshop-native/theme/variables/platform';

const styles = StyleSheet.create({
  loadingItem: {
    marginTop: platform.getSize(3) - 1,
    marginBottom: platform.getSize(3) - 1,
    marginLeft: platform.getSize(4) + 2,
    marginRight: platform.getSize(4) + 2,
  },
  image: {
    height: platform.getSize(14),
    width: platform.getSize(14),
    backgroundColor: platform.skeletonBackgroundColor,
    borderRadius: 5,
  },
});

const CategoryItemLoading: FC = memo(() => (
  <LoadingRect style={styles.loadingItem} height={platform.getSize(14)} />
));

interface CategoryItemProps {
  category: Category;
  pushToCategory: CategoriesScreenStore['pushToCategory'];
}

const CategoryItem: FC<CategoryItemProps> = memo(({ category, pushToCategory }) => {
  const onPress = () => pushToCategory(category);

  return (
    <ListItem thumbnail noBorder onPress={onPress}>
      <Left>
        <View style={styles.image} />
      </Left>
      <Body>
        <Text>{category.name}</Text>
      </Body>
      <Right>
        <Icon type="MaterialCommunityIcons" name="chevron-right" />
      </Right>
    </ListItem>
  );
});

export const CategoriesScreen: FC = () => {
  const { categories, isLoading, pushToCategory } = useStore(CategoriesScreenStore);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>Catalog</Title>
        </Body>
      </Header>
      <Content>
        <List>
          {isLoading ? (
            <>
              <CategoryItemLoading />
              <CategoryItemLoading />
            </>
          ) : (
            categories.map((c) => (
              <CategoryItem key={c.id} category={c} pushToCategory={pushToCategory} />
            ))
          )}
        </List>
      </Content>
    </Container>
  );
};

export default observer(CategoriesScreen);
