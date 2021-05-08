import React from 'react';
import {
  Box,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Image from 'next/image';
import { motion } from 'framer-motion';

import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage:
      'url("/backgrounds/divider-top.svg"), url("/backgrounds/bg-logo.svg"), url("/backgrounds/blue-gradient.svg")',
    backgroundSize: 'auto, auto, auto',
    backgroundPosition: 'bottom, center',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
    height: '330px',
    paddingTop: '55px',
    marginBottom: '50px',
    [theme.breakpoints.up('md')]: {
      height: '700px',
      paddingTop: '220px',
      marginBottom: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '1270px',
      paddingTop: '425px',
      marginBottom: '100px',
    },
  },
  gridItemLogo: {
    paddingBottom: '10px',
  },
  gridItemDescription: {
    textAlign: 'center',
    zIndex: 1,
  },
}));

export default function SectionIntroduction(props) {
  const { data } = props;
  const classes = useStyles(props);
  const logoImagesCollection = data.sectionType?.logoImagesCollection;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesTablet = useMediaQuery(theme.breakpoints.up('md'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const description = matchesMobile
    ? data?.sectionType?.descriptionMobile
    : data?.sectionType?.description;

  const renderLogoImage = () => {
    let device = 'Desktop';
    if (matchesDesktop) {
      device = 'Desktop';
    } else if (matchesTablet) {
      device = 'Tablet';
    } else {
      device = 'Mobile';
    }

    const image = logoImagesCollection.items.find(
      item => item.device === device
    );

    if (!image) {
      return null;
    }

    return (
      <Box width={image.width}>
        <Image
          src={image.image.url}
          alt={image.image.description}
          layout={image.layout}
          width={image.width}
          height={image.height}
          objectFit={image.objectFit}
          objectPosition={image.objectPosition}
          quality={image.quality || 45}
        />
      </Box>
    );
  };

  return (
    <motion.div
      animate={{ backgroundSize: ['auto, 100%', 'auto, 150%', 'auto, 100%'] }}
      transition={{ duration: 20, repeat: Infinity }}
      className={classes.background}
    >
      <Grid
        className={classes.container}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.gridItemLogo} item xs>
          {renderLogoImage()}
        </Grid>
        <Grid className={classes.gridItemDescription} item xs>
          <RichTextBlock
            data={description?.json}
            isSubtitle
            descriptionClassName="introductionDescription"
          />
        </Grid>
      </Grid>
    </motion.div>
  );
}
