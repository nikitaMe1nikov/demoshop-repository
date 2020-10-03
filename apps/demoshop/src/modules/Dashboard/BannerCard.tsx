import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';
import { Banner } from '@api/modules/gql.schema';

const useStyles = makeStyles({
  img: {
    height: 252,
  },
});

export const BannerCardLoading: FC = () => <Skeleton variant="rect" height={354} />;

interface BannerCardProps {
  banner: Banner;
}

export const BannerCard: FC<BannerCardProps> = ({ banner }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardMedia className={classes.img} image={banner.images.big} title={banner.name} />
      <CardContent>
        <Typography variant="h6">{banner.name}</Typography>
        <Typography variant="subtitle1">{banner.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
