import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { StarBorder, Star } from '@material-ui/icons';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';
import LinkButton from '@/components/shared/ui-elements/link-button';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

const useStyles = makeStyles(theme => ({
  firstImageContainer: { width: '610px', height: '400px' },
  secondImageContainer: {
    visibility: 'hidden',
    position: 'absolute',
    top: '42px',
    left: 0,
    right: 0,
  },
  clientContainer: {
    position: 'relative',
    '&:hover $firstImageContainer': {
      opacity: '20%',
    },
    '&:hover $secondImageContainer': {
      visibility: 'visible',
    },
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '97%',
    margin: '0 auto 6px',
  },
  cardContent: {
    padding: '20px',
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: '0 8px 8px 20px',
  },
  linkContainer: {
    margin: '0 7.5px',
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

export default function SectionClient(props) {
  console.log(props);
  const { data } = props;
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorite(isFavorite => !isFavorite);
  };

  return (
    <SectionLayout>
      <Box mb="20px">
        <RichTextBlock
          data={data.description?.json}
          h2ClassName="h2Type1"
          descriptionClassName="description1"
        />
      </Box>
      <Grid container>
        <Grid className={classes.clientContainer} item xs={12}>
          <Box className={classes.firstImageContainer}>
            <Image
              src="/client-card.svg"
              alt="Greenstone Wellness"
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              quality={45}
            />
          </Box>
          <Box className={classes.secondImageContainer}>
            <Image
              src="/gsw-logo.svg"
              alt="Greenstone Wellness"
              layout="responsive"
              objectPosition="center center"
              width={610}
              height={163}
              quality={45}
            />
          </Box>

          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center">
                <IconButton
                  aria-label="favorite"
                  edge="start"
                  onClick={onFavoriteClick}
                >
                  {isFavorite ? <Star /> : <StarBorder />}
                </IconButton>
                <Typography variant="h5" component="h2">
                  Green Stone Wellness Clinic
                </Typography>
              </Box>
              <Typography variant="body1" component="p">
                Description and blurb here it will fade when sentences are too
                long, like this one. The default of the card is faded white and
                will show colour on HOVER. This feature is only for Desktop, not
                for tablet or mobile.
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Box className={classes.linkContainer}>
                <LinkButton variant="h4">WEBSITE</LinkButton>
              </Box>
              <Box className={classes.linkContainer}>
                <IconButton edge="start">
                  <Box width={22} height={22}>
                    <Image
                      src="/facebook-icon.svg"
                      alt="facebook"
                      layout="responsive"
                      width={22}
                      height={22}
                      quality={45}
                    />
                  </Box>
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </SectionLayout>
  );
}