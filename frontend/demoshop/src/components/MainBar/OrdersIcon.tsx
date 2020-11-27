import React, { FC, memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Link from 'next/link';
import { ORDERS_URL } from '@frontend/url';

const ARIA_LABEL = 'orders';

export const OrdersIcon: FC = () => {
  return (
    <Link href={ORDERS_URL}>
      <a>
        <IconButton aria-label={ARIA_LABEL} color="inherit">
          <FormatAlignJustifyIcon />
        </IconButton>
      </a>
    </Link>
  );
};

export default memo(OrdersIcon);
