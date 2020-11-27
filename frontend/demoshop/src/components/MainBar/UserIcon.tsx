import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { UserStore } from '@frontend/user-store';
import ModalAuthStore from 'components/Auth/ModalAuthStore';
import Link from 'next/link';
import { USER_URL } from '@frontend/url';

const ARIA_LABEL = 'account of current user';

export const UserIcon: FC = () => {
  const { isAnonim } = useStore(UserStore);
  const { showForm } = useStore(ModalAuthStore);

  if (isAnonim) {
    return (
      <IconButton aria-label={ARIA_LABEL} color="inherit" onClick={showForm}>
        <AccountCircle />
      </IconButton>
    );
  }

  return (
    <Link href={USER_URL}>
      <a>
        <IconButton aria-label={ARIA_LABEL} color="inherit">
          <AccountCircle />
        </IconButton>
      </a>
    </Link>
  );
};

export default observer(UserIcon);
