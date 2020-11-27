import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Title, Body, Card, CardItem, Text, Button, Icon } from 'native-base';
import { CatalogStore } from '@frontend/catalog-store';
import { ProductModelType } from '@frontend/gql';
import { UserStore } from '@frontend/user-store';
import { DOL } from '@frontend/constants';
import FavoriteIcon from 'screens/CategoryScreen/ProductCard/FavoriteIcon';
import ProductAmountButton from 'screens/CartScreen/ProductAmountButton';
import { childrenCenter, childrenRow } from 'components/layoutStyles';
import platform from 'theme/variables/platform';
import Header from 'components/Header';
import LoadingRect from 'components/LoadingRect';
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
  product: ProductModelType;
  onClose?: () => void;
}

export const ProductDetailsModal: FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { isLogin } = useStore(UserStore);
  const { getProduct } = useStore(CatalogStore);
  const { id, name, price, description, recomendations } = product;

  useEffect(() => {
    if (!description) getProduct(id);
  }, [id, description, getProduct]);

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
            <ProductAmountButton product={product} />
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
          {isLogin && <FavoriteIcon style={styles.favoriteIcon} product={product} />}
        </Card>
        {recomendations && (
          <Card>
            <CardItem header>
              <Text>Recomendations</Text>
            </CardItem>
            <CardItem style={childrenRow}>
              {recomendations.map((p) => (
                <ProductCard key={p.id} style={styles.card} product={p} />
              ))}
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

export default observer(ProductDetailsModal);
