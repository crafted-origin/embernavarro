import { useState, useEffect } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { XMasonry, XBlock } from 'react-xmasonry';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

import SectionLayout from '@/components/shared/layouts/section-layout';
import LinkButton from '@/components/shared/ui-elements/link-button';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

// Minimum column width per tile for each device.
const deviceColumnWidth = {
  desktop: [191, 296, 400, 504, 608],
  tablet: [122, 191, 260, 329, 397],
  mobile: [88, 120, 152, 184, 216, 248, 280],
};

// All possible tile heights for each device.
const deviceRowHeight = {
  desktop: [192, 296, 400],
  tablet: [122, 191, 260],
  mobile: [56, 120, 184],
};

// Todo: Move these to CMS
const types = ['all', 'mobile', 'website', 'art', 'merch'];

const useStyles = makeStyles(theme => ({
  imageContainer: {
    cursor: 'pointer',
    filter: 'saturate(0)',
    '&:hover': {
      filter: 'saturate(1)',
    },
  },
}));

export default function SectionProjectMasonry(props) {
  const { data } = props;
  const classes = useStyles();
  const theme = useTheme();
  // ! Need to disable SSR to have proper matches on initial load.
  // ! https://github.com/mui-org/material-ui/pull/23806/files
  const matchesMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });
  const matchesTablet = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  });
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  const [initialTileData, setInitialTileData] = useState([]);
  const [tileData, setTileData] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  // * Desktop matches first then mobile to cover max and min.
  const targetBlockWidth = matchesDesktop
    ? deviceColumnWidth.desktop[0]
    : matchesMobile
    ? deviceColumnWidth.mobile[0]
    : deviceColumnWidth.tablet[0];

  useEffect(() => {
    const gridList = data?.sectionType.gridList;
    const allTileData = gridList.gridListTilesCollection?.items;

    setInitialTileData(allTileData);
    setTileData(allTileData);
  }, [props.data]);

  const onFilterClick = type => {
    if (type === 'all') {
      setTileData(initialTileData);
    } else {
      const projectTileData = initialTileData.filter(data =>
        data.types.includes(type)
      );
      setTileData(projectTileData);
    }

    setSelectedType(type);
  };

  const projectFilters = types.map((type, index) => (
    <LinkButton
      key={index}
      className="filterButton"
      component="button"
      variant="h4"
      color="textSecondary"
      title={type}
      isSelected={type === selectedType}
      onLinkButtonClick={() => {
        onFilterClick(type);
      }}
    >
      {type}
    </LinkButton>
  ));

  return (
    <SimpleReactLightbox>
      <SectionLayout minHeight="800px">
        <Box mb="10px">
          <RichTextBlock data={data.description?.json} h2ClassName="h2Type1" />
        </Box>
        <Box display="flex" justifyContent="center" marginBottom="20px">
          {projectFilters}
        </Box>
        <SRLWrapper>
          {/* Max columns for all device cases. */}
          <XMasonry maxColumns={12} targetBlockWidth={targetBlockWidth}>
            {tileData.map(tile => {
              const {
                tileImage: {
                  image,
                  layout,
                  width,
                  height,
                  objectFit,
                  objectPosition,
                  quality,
                },
                desktopColumns,
                tabletColumns,
                mobileColumns,
                desktopRows,
                tabletRows,
                mobileRows,
              } = tile;

              let { imageWidth, imageHeight } = calcIntrinsicDimensions(
                matchesDesktop,
                matchesMobile,
                layout,
                width,
                height
              );

              const calcDimensions = () => {
                let xBlockWidth;
                let xBlockHeight;
                if (matchesDesktop) {
                  xBlockWidth = desktopColumns || 1;
                  xBlockHeight =
                    deviceRowHeight.desktop[(desktopRows || 1) - 1];
                } else if (matchesTablet) {
                  xBlockWidth = tabletColumns || 1;
                  xBlockHeight = deviceRowHeight.tablet[(tabletRows || 1) - 1];
                } else {
                  xBlockWidth = mobileColumns || 1;
                  xBlockHeight = deviceRowHeight.mobile[(mobileRows || 1) - 1];
                }

                return { xBlockWidth, xBlockHeight };
              };

              const variants = {
                enter: {
                  opacity: 0,
                  y: 50,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    opacity: {
                      duration: 0.5,
                    },
                    y: {
                      duration: 0.5,
                    },
                  },
                },
              };

              return (
                <XBlock width={calcDimensions().xBlockWidth} key={image.sys.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.01 }}
                    variants={variants}
                    initial="enter"
                    animate="show"
                  >
                    <Box
                      key={image.sys.id}
                      height={calcDimensions().xBlockHeight}
                      position="relative"
                      m={{ xs: 0.5, md: 1, lg: 1 }}
                      // Required to show border-radius
                      overflow="hidden"
                      borderRadius={10}
                      className={classes.imageContainer}
                    >
                      <Image
                        src={image.url}
                        alt={image.description}
                        layout={layout || 'fill'}
                        width={imageWidth}
                        height={imageHeight}
                        objectFit={objectFit || 'cover'}
                        objectPosition={objectPosition || 'center center'}
                        quality={quality || 45}
                        style={{ zIndex: -1 }}
                      />
                    </Box>
                  </motion.div>
                </XBlock>
              );
            })}
          </XMasonry>
        </SRLWrapper>
      </SectionLayout>
    </SimpleReactLightbox>
  );
}

/**
 * Returns the required default or defined width and height of an image if layout is not fill.
 * @param {string} layout next/image layout options.
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 */
function calcIntrinsicDimensions(
  matchesDesktop,
  matchesMobile,
  layout,
  width,
  height
) {
  let imageWidth;
  let imageHeight;
  // Image requires width and height only if layout is not fill
  if (layout !== 'fill') {
    imageWidth = width;
    imageHeight = height;

    if (!imageWidth) {
      imageWidth = matchesDesktop
        ? deviceColumnWidth.desktop[1]
        : matchesMobile
        ? deviceColumnWidth.mobile[1]
        : deviceColumnWidth.tablet[1];
    }

    if (!imageHeight) {
      imageHeight = matchesDesktop
        ? deviceRowHeight.desktop[1]
        : matchesMobile
        ? deviceRowHeight.mobile[1]
        : deviceRowHeight.tablet[1];
    }
  }
  return { imageWidth, imageHeight };
}
