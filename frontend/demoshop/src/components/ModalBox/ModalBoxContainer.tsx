import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import MaterialModalStore from './MaterialModalStore';

export const ModalBoxContainer: FC = () => {
  const { modals } = useStore(MaterialModalStore);

  return <>{[...modals.values()]}</>;
};

export default observer(ModalBoxContainer);
