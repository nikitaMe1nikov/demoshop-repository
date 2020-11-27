import React, { FC, useCallback, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
}));

const Container = withStyles({
  paper: {
    maxWidth: '380px',
  },
})(Dialog);

const ARIA_LABEL = 'form-dialog-title';

interface ModalAuthProps {
  open: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

export const ModalAuth: FC<ModalAuthProps> = ({ open, onClose, onExited }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = useCallback((e, newValue) => {
    setTabIndex(newValue);
  }, []);

  return (
    <Container open={open} onClose={onClose} onExited={onExited} aria-labelledby={ARIA_LABEL}>
      <Tabs
        className={classes.tabs}
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Login" />
        <Tab label="SignUp" />
      </Tabs>
      <DialogContent>{tabIndex === 0 ? <LoginForm /> : <SignupForm />}</DialogContent>
    </Container>
  );
};

export default ModalAuth;
