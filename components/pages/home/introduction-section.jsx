import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';

const useStyles = makeStyles(theme => ({
  description: {
    ...theme.description,
  },
  subtitle: {
    ...theme.subtitle,
    marginBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      ...theme.subtitle[theme.breakpoints.up('sm')],
      marginBottom: '20px',
    },
    // Need a deep merge since theme already contains the same key.
    [theme.breakpoints.up('lg')]: {
      ...theme.subtitle[theme.breakpoints.up('lg')],
      marginBottom: '30px',
    },
  },
  gridItemLogo: {
    paddingBottom: '10px',
  },
  gridItemDescription: {
    textAlign: 'center',
  },
}));

export default function IntroductionSection(props) {
  const { data } = props;
  const classes = useStyles(props);
  const logoImagesCollection = data.sectionType?.logoImagesCollection;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Typography variant="h1">{children}</Typography>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Typography className={classes.subtitle} variant="h2">
            {children}
          </Typography>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return (
          <Typography className={classes.description} variant="body1">
            {children}
          </Typography>
        );
      },
    },
    renderText: text =>
      text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  };

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
          objectFit={'cover'}
          objectPosition={image.objectPosition || 'center center'}
          quality={image.quality || 45}
        />
      </Box>
    );
  };

  return (
    <SectionLayout mb={{ lg: '100px', sm: '50px', xs: '50px' }}>
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
          {documentToReactComponents(description?.json, RICHTEXT_OPTIONS)}
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
