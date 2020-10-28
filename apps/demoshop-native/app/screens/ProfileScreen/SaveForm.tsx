import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Card, CardItem, Text } from 'native-base';
import TextInput from '@demoshop-native/components/TextInput';
import ButtonLoading from '@demoshop-native/components/ButtonLoading';
import { UserStore } from '@demo/user-store';
import { ProfileStore } from '@demo/profile-store';
import { stretch } from '@demoshop-native/components/layoutStyles';
import Image from './Image';

export const SaveForm: FC = () => {
  const {
    email,
    name,
    surname,
    logout,
    saveProfile,
    isLoadingSaveProfile,
    isLoadingLogout,
  } = useStore(ProfileStore);
  const { user } = useStore(UserStore);

  return (
    <Card>
      <Image />
      <CardItem header>
        <Text>{`${user.name} ${user.surname}`}</Text>
      </CardItem>
      <CardItem>
        <TextInput label="Name" store={name} />
      </CardItem>
      <CardItem>
        <TextInput label="Surname" store={surname} />
      </CardItem>
      <CardItem>
        <TextInput label="Email Address" keyboardType="email-address" store={email} />
      </CardItem>
      <CardItem>
        <ButtonLoading
          style={stretch}
          label="save"
          isLoading={isLoadingSaveProfile}
          onPress={saveProfile}
        />
      </CardItem>
      <CardItem footer>
        <ButtonLoading
          style={stretch}
          label="logout"
          isLoading={isLoadingLogout}
          onPress={logout}
        />
      </CardItem>
    </Card>
  );
};

export default observer(SaveForm);
