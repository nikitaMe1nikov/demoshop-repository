import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { Card, CardItem, Text } from 'native-base';
import { SignupFormStore } from '@frontend/auth-store';
import TextInput from 'components/TextInput';
import ButtonLoading from 'components/ButtonLoading';
import { stretch } from 'components/layoutStyles';

export const SignupForm: FC = () => {
  const { email, name, password, checkPassword, submitButton, isLoading } = useStore(
    SignupFormStore
  );

  return (
    <Card>
      <CardItem header>
        <Text>Signup</Text>
      </CardItem>
      <CardItem>
        <TextInput label="Email Address" keyboardType="email-address" store={email} />
      </CardItem>
      <CardItem>
        <TextInput label="User Name" store={name} />
      </CardItem>
      <CardItem>
        <TextInput label="Password" store={password} secureTextEntry />
      </CardItem>
      <CardItem>
        <TextInput label="Reply Password" secureTextEntry store={checkPassword} />
      </CardItem>
      <CardItem footer>
        <ButtonLoading
          style={stretch}
          label="Signup"
          isLoading={isLoading}
          onPress={submitButton}
        />
      </CardItem>
    </Card>
  );
};

export default observer(SignupForm);
