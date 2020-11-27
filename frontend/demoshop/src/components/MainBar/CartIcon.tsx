import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { CartStore } from '@frontend/cart-store';
import Link from 'next/link';
import { CART_URL } from '@frontend/url';

const ARIA_LABEL = 'show 4 new mails';

export const CartIcon: FC = () => {
  const { total } = useStore(CartStore);

  return (
    <Link href={CART_URL}>
      <a>
        <IconButton aria-label={ARIA_LABEL} color="inherit">
          <Badge badgeContent={total} color="error">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </a>
    </Link>
  );
};

export default observer(CartIcon);
