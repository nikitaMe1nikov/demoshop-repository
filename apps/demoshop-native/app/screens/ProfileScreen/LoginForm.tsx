import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Card, CardItem, Text } from 'native-base';
import TextInput from '@demoshop-native/components/TextInput';
import ButtonLoading from '@demoshop-native/components/ButtonLoading';
import { LoginFormStore } from '@demo/auth-store';
import { stretch } from '@demoshop-native/components/layoutStyles';

export const LoginForm: FC = () => {
  const { login, password, submitButton, isLoading } = useStore(LoginFormStore);

  return (
    <Card>
      <CardItem header>
        <Text>Login</Text>
      </CardItem>
      <CardItem>
        <TextInput label="Email Address" store={login} keyboardType="email-address" />
      </CardItem>
      <CardItem>
        <TextInput label="Password" store={password} secureTextEntry />
      </CardItem>
      <CardItem footer>
        <ButtonLoading style={stretch} label="Login" isLoading={isLoading} onPress={submitButton} />
      </CardItem>
    </Card>
  );
};

export default observer(LoginForm);
