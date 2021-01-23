import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="h1">{children}</Typography>
        </Grid>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="h2">{children}</Typography>
        </Grid>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="body1">{children}</Typography>
        </Grid>
      );
    },
  },
};

export default function IntroductionSection(props) {
  const { data } = props;
  const logoImagesCollection = data.sectionType?.logoImagesCollection;
  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

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

    return (
      <Box width={image?.width || 800} m={1}>
        {image && (
          <Image
            src={image.image.url}
            alt={image.image.description}
            layout="responsive"
            width={image.width}
            height={image.height}
            objectFit={image.objectFit || 'cover'}
            objectPosition={image.objectPosition || 'center center'}
            quality={image.quality || 45}
            // sizes={sizes}
          />
        )}
      </Box>
    );
  };

  const description = data?.sectionType.description;

  return (
    <SectionLayout>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs>
          {renderLogoImage()}
        </Grid>
        {documentToReactComponents(description.json, RICHTEXT_OPTIONS)}
      </Grid>
    </SectionLayout>
  );
}
