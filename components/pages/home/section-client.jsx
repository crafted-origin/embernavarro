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
  firstImageContainer: { marginTop: '42px' },
  secondImageContainer: {
    position: 'absolute',
    opacity: '20%',
    top: 0,
    left: 0,
    right: 0,
    height: '400px',
  },
  clientContainer: {
    position: 'relative',
    '&:hover $firstImageContainer': {
      visibility: 'hidden',
    },
    '&:hover $secondImageContainer': {
      opacity: '100%',
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
  // console.log(props);
  const { data } = props;
  const clients = data?.sectionType?.clientsCollection.items;
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorite(isFavorite => !isFavorite);
  };

  const clientCards = clients.map(client => {
    const { title, image, hoverImage, linksCollection } = client;
    return (
      <Grid
        key={title}
        className={classes.clientContainer}
        item
        xs={12}
        style={{ height: '400px' }}
      >
        <Box className={classes.firstImageContainer}>
          <Image
            src={image.image.url}
            alt={image.image.description}
            layout={image.layout}
            objectFit={image.objectFit}
            objectPosition={image.objectPosition}
            width={image.width}
            height={image.height}
            quality={image.quality}
          />
        </Box>
        <Box className={classes.secondImageContainer}>
          <Image
            src={hoverImage.image.url}
            alt={hoverImage.image.description}
            layout={hoverImage.layout}
            objectFit={hoverImage.objectFit}
            objectPosition={hoverImage.objectPosition}
            width={hoverImage.layout !== 'fill' && hoverImage.width}
            height={hoverImage.layout !== 'fill' && hoverImage.height}
            quality={hoverImage.quality}
          />
        </Box>

        <Card className={classes.card} variant="outlined">
          <CardContent>
            <RichTextBlock
              data={client.description.json}
              descriptionVariant="body1"
              descriptionClassName="clientCardDescription"
              isTitleWithIcon
              onTitleWithIconClick={onFavoriteClick}
              isFavorite={isFavorite}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            {linksCollection.items.map(link => {
              const { title, icon, name, url } = link;
              return (
                <Box key={title} className={classes.linkContainer}>
                  {!icon ? (
                    <LinkButton variant="h4">{name}</LinkButton>
                  ) : (
                    <IconButton edge="start">
                      <Box width={icon.width} height={icon.height}>
                        <Image
                          src={icon.image.url}
                          alt={icon.image.description}
                          layout={icon.layout}
                          width={icon.width}
                          height={icon.height}
                          quality={icon.quality}
                        />
                      </Box>
                    </IconButton>
                  )}
                </Box>
              );
            })}
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <SectionLayout>
      <Box mb="20px">
        <RichTextBlock
          data={data.description?.json}
          h2ClassName="h2Type1"
          descriptionClassName="description1"
        />
      </Box>
      <Grid container>{clientCards}</Grid>
    </SectionLayout>
  );
}
