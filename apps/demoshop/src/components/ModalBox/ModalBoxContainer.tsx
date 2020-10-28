import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import ModalBoxStore from './ModalBoxStore';

export const ModalBoxContainer: FC = () => {
  const { modals } = useStore(ModalBoxStore);

  return <>{[...modals.values()]}</>;
};

export default observer(ModalBoxContainer);
