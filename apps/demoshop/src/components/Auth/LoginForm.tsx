import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextInput from '@demoshop/components/TextInput';
import { LoginFormStore } from '@demo/auth-store';

export const LoginForm: FC = observer(() => {
  const { login, password, submitButton, isLoading } = useStore(LoginFormStore);

  return (
    <>
      <Box mx={3} mt={4} pt={9} minHeight={288}>
        <TextInput
          autoFocus
          name="email"
          margin="normal"
          label="Email Address"
          type="email"
          store={login}
          fullWidth
          required
        />
        <TextInput
          margin="normal"
          name="password"
          label="Password"
          type="password"
          store={password}
          fullWidth
          required
        />
      </Box>
      <Box mx={3} mb={5} mt={8}>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
          size="large"
          onClick={submitButton}
        >
          {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Login'}
        </Button>
      </Box>
    </>
  );
});

export default LoginForm;
