import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';
import LinkButton from '@/components/shared/ui-elements/link-button';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

const useStyles = makeStyles(theme => ({
  // !Needed to use gap with -margin(in item containers) since cover image doesn't respect grid spacing that uses padding.
  gridContainer: {
    gap: 16,
    [theme.breakpoints.up('md')]: {
      gap: 40,
    },
  },
  clientItemContainer: {
    height: '376px',
    position: 'relative',
    marginBottom: theme.spacing(2),
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow: `0 0 20px rgba(82, 82, 82, 0.5)`,
    '&:hover $firstImageContainer': {
      visibility: 'hidden',
    },
    '&:hover $secondImageContainer': {
      opacity: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: '397px',
      margin: '-10px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '400px',
    },
  },
  firstImageContainer: {
    marginTop: '42px',
    paddingLeft: '20px',
    paddingRight: '15px',
    [theme.breakpoints.up('md')]: {
      marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '21px',
    },
    '& img': {
      zIndex: 1,
    },
  },
  secondImageContainer: {
    position: 'absolute',
    opacity: '20%',
    top: 0,
    left: 0,
    right: 0,
    height: '400px',
  },
  card: {
    boxShadow: `0 2px 10px rgba(128, 128, 128, 0.5)`,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '97%',
    margin: '0 auto 6px',
  },
  cardContent: {
    padding: '20px 20px 0 20px',
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
  const { data } = props;
  const clients = data?.sectionType?.clientsCollection.items;
  const classes = useStyles();

  const clientCards = clients.map(client => {
    const { title, image, hoverImage, linksCollection } = client;
    return (
      <Grid
        key={title}
        className={classes.clientItemContainer}
        item
        xs={12}
        md={6}
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
          <CardContent className={classes.cardContent}>
            <RichTextBlock
              data={client.description.json}
              descriptionVariant="body1"
              descriptionClassName="clientCardDescription"
              isTitleWithIcon
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            {linksCollection.items.map(link => {
              const { title, icon, name, url } = link;
              return (
                <Box key={title} className={classes.linkContainer}>
                  {!icon ? (
                    <LinkButton
                      href={url}
                      variant="h4"
                      title={name}
                      component="button"
                    >
                      {name}
                    </LinkButton>
                  ) : (
                    <IconButton href={url} edge="start">
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
    // Todo: Change from pb back to margin and figure out why particles is underneath.
    <SectionLayout pb={{ xs: '50px', md: '100px', lg: '200px' }}>
      <Box mb="20px">
        <RichTextBlock
          data={data.description?.json}
          h2ClassName="h2Type1"
          descriptionClassName="description1"
        />
      </Box>
      <Grid container className={classes.gridContainer}>
        {clientCards}
      </Grid>
    </SectionLayout>
  );
}
