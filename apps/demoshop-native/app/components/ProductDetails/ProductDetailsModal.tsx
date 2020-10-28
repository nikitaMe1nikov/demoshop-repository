import React, { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Title, Body, Card, CardItem, Text, Button, Icon } from 'native-base';
import { CatalogStore, Product } from '@demo/catalog-store';
import { UserStore } from '@demo/user-store';
import { DOL } from '@demo/constants';
import FavoriteIcon from '@demoshop-native/screens/CategoryScreen/ProductCard/FavoriteIcon';
import ProductAmountButton from '@demoshop-native/screens/CartScreen/ProductAmountButton';
import { childrenCenter, childrenRow } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';
import Header from '@demoshop-native/components/Header';
import LoadingRect from '@demoshop-native/components/LoadingRect';
import ProductCard from './ProductCard';

const styles = StyleSheet.create({
  image: {
    height: platform.getSize(80),
    width: '100%',
    backgroundColor: platform.skeletonBackgroundColor,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  card: {
    width: '50%',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
  },
});

export const Image: FC = () => <View style={styles.image} />;

const DescriptionLoading: FC = () => <LoadingRect height={platform.getSize(10)} />;

export interface ProductDetailsModalProps {
  product: Product;
  onClose?: () => void;
}

export const ProductDetailsModal: FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { isLogin } = useStore(UserStore);
  const {
    productsMap,
    isLoadingFavorites,
    addFavorite,
    removeFavorite,
    showProductDetailsModal,
    getProduct,
  } = useStore(CatalogStore);
  const { name, price, favorite, description, recomendations } =
    productsMap.get(product.id) || product;
  const isLoadingFavorite = isLoadingFavorites.has(product.id);
  const onOpenModal = useCallback((product: Product) => {
    showProductDetailsModal(ProductDetailsModal, { product });
  }, []);

  useEffect(() => {
    if (!description) getProduct(product.id);
  }, [product.id, description]);

  return (
    <Container>
      <Header>
        <Body style={childrenCenter}>
          <Title>{name}</Title>
        </Body>
        <Button style={styles.closeButton} transparent onPress={onClose}>
          <Icon type="MaterialCommunityIcons" name="close" />
        </Button>
      </Header>
      <Content>
        <Card>
          <Image />
          <CardItem>
            <Body>
              <Text>{name}</Text>
              <Text>
                {price} {DOL}
              </Text>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <ProductAmountButton productID={product.id} />
          </CardItem>
          <CardItem>
            {!description ? (
              <DescriptionLoading />
            ) : (
              <Body>
                <Text>{description}</Text>
              </Body>
            )}
          </CardItem>
          {isLogin && (
            <FavoriteIcon
              style={styles.favoriteIcon}
              isLoading={isLoadingFavorite}
              productID={product.id}
              favorite={favorite}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          )}
        </Card>
        {recomendations && (
          <Card>
            <CardItem header>
              <Text>Recomendations</Text>
            </CardItem>
            <CardItem style={childrenRow}>
              {recomendations.map((p) => (
                <ProductCard
                  key={p.id}
                  style={styles.card}
                  productID={p.id}
                  productsMap={productsMap}
                  isLogin={isLogin}
                  onOpenModal={onOpenModal}
                />
              ))}
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

export default observer(ProductDetailsModal);
