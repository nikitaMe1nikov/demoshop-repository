import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Card, CardItem, Text } from 'native-base';
import { UserStore } from '@demo/user-store';
import Image from './Image';

export const AnonimForm: FC = () => {
  const { user } = useStore(UserStore);

  return (
    <Card>
      <Image />
      <CardItem header>
        <Text>{user.name}</Text>
      </CardItem>
    </Card>
  );
};

export default observer(AnonimForm);
