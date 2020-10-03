import React, { FC, useCallback, memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsStore from 'modules/Notification/NotificationsStore';
import { dateToTime } from 'utils/format';

const useStyles = makeStyles((theme) => ({
  container: (viewed) =>
    !viewed && {
      background: theme.palette.grey[100],
    },
  text: (viewed) =>
    !viewed && {
      fontWeight: 700,
    },
  date: {
    textAlign: 'right',
  },
}));

interface NotificationItemProps {
  message: string;
  viewed: boolean;
  date: string;
}

export const NotificationItem: FC<NotificationItemProps> = memo(({ message, viewed, date }) => {
  const classes = useStyles(viewed);

  return (
    <ListItem className={classes.container}>
      <ListItemText className={classes.text} primary={message} />
      <ListItemText className={classes.date} secondary={dateToTime(date)} />
    </ListItem>
  );
});

export const NotificationLoading: FC = () => (
  <Box minHeight="200px" display="flex" justifyContent="center" alignItems="center">
    <Typography variant="subtitle1">No notifications yet</Typography>
  </Box>
);

export const NotificationIcon: FC = () => {
  const { notifications, showNotifications, notViewedTotal } = useStore(NotificationsStore);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  useEffect(() => {
    if (open) showNotifications();
  }, [open, showNotifications]);

  const handleClick = useCallback((e) => setAnchorEl(e.currentTarget), []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  return (
    <>
      <IconButton
        aria-label={`show ${notViewedTotal} new notifications`}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notViewedTotal} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box minWidth={400} maxHeight={60 * 8 + 8}>
          <List>
            {notifications.length ? (
              notifications.map(({ id, message, viewed, date }, indx) => [
                <NotificationItem key={id} message={message} viewed={viewed} date={date} />,
                notifications.length - 1 !== indx && <Divider key={id + indx} />,
              ])
            ) : (
              <NotificationLoading />
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default observer(NotificationIcon);
