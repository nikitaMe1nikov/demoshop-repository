import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SignupFormStore } from '@demo/auth-store';
import TextInput from '@demoshop/components/TextInput';

export const SignupForm: FC = observer(() => {
  const { email, name, password, checkPassword, submitButton, isLoading } = useStore(
    SignupFormStore
  );

  return (
    <>
      <Box mx={3} mt={4} minHeight={288}>
        <TextInput
          autoFocus
          name="email"
          margin="normal"
          label="Email Address"
          type="email"
          store={email}
          fullWidth
          required
        />
        <TextInput name="name" margin="normal" label="User Name" store={name} fullWidth required />
        <TextInput
          margin="normal"
          name="password"
          label="Password"
          type="password"
          store={password}
          fullWidth
          required
        />
        <TextInput
          margin="normal"
          name="replyPassword"
          label="Reply Password"
          type="password"
          store={checkPassword}
          fullWidth
          required
        />
      </Box>
      <Box mx={3} mb={5} mt={8}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
          size="large"
          onClick={submitButton}
        >
          {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Signup'}
        </Button>
      </Box>
    </>
  );
});

export default SignupForm;
