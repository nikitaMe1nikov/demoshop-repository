import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { styled, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProductDetailsModal from 'components/Catalog/ProductDetailsModal';
import { DOL } from 'components/constants';
import { ProductModelType } from '@frontend/gql';
import { ModalBoxStore } from '@frontend/modal-box';

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const Image = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  height: 160,
  cursor: 'pointer',
}));

interface ProductCardProps {
  product: ProductModelType;
  total?: number;
}

export const ProductCard: FC<ProductCardProps> = ({ product, total }) => {
  const classes = useStyles();
  const { open } = useStore(ModalBoxStore);
  const onClickImage = () => open(ProductDetailsModal, { product });

  return (
    <Card className={classes.container} variant="outlined">
      <Image onClick={onClickImage} />
      <CardContent>
        <Typography variant="subtitle1">{product.name}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {`${product.price} ${DOL}`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {`${total} it`}
          </Typography>
        </Box>
      </CardContent>
      <Box />
    </Card>
  );
};

export default observer(ProductCard);
