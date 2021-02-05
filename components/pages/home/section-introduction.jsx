import {
  Box,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

const useStyles = makeStyles(theme => ({
  gridItemLogo: {
    paddingBottom: '10px',
  },
  gridItemDescription: {
    textAlign: 'center',
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
    // Todo: Remove pt when Appbar is added in
    <SectionLayout mb={{ xs: '50px', md: '50px', lg: '100px' }} pt="50px">
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
    </SectionLayout>
  );
}
