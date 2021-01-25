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
  container: {},
}));

export default function IntroductionSection(props) {
  const { data } = props;
  const classes = useStyles(props);
  const logoImagesCollection = data.sectionType?.logoImagesCollection;
  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Typography variant="h1">{children}</Typography>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Typography
            variant="h2"
            style={{
              color: theme.colors.white[400],
              fontSize: '30px',
              marginBottom: '42px',
            }}
          >
            {children}
          </Typography>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return (
          <Typography variant="body1" style={{ color: '#FFFFFF' }}>
            {children}
          </Typography>
        );
      },
    },
  };

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
      <Box width={image.width} mb={'10px'}>
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

  const description = data?.sectionType.description;

  return (
    <SectionLayout mb={{ desktop: '100px', tablet: '50px', mobile: '50px' }}>
      <Grid
        className={classes.container}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          desktop={8}
          tablet={6}
          mobile={12}
          style={{ paddingBottom: '10px' }}
        >
          {renderLogoImage()}
        </Grid>
        <Grid
          item
          desktop={8}
          tablet={6}
          mobile={12}
          style={{ paddingBottom: '10px' }}
        >
          {documentToReactComponents(description.json, RICHTEXT_OPTIONS)}
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
