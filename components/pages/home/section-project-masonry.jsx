import { useState, useEffect } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { XMasonry, XBlock } from 'react-xmasonry';
import Image from 'next/image';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

import SectionLayout from '@/components/shared/layouts/section-layout';
import LinkButton from '@/components/shared/ui-elements/link-button';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

// Minimum column width per tile for each device.
const deviceColumnWidth = {
  desktop: 191,
  tablet: 122,
  mobile: 88,
};

// All possible tile heights for each device.
const deviceRowHeight = {
  desktop: [192, 296, 400],
  tablet: [122, 191, 260],
  mobile: [56, 120, 184],
};

export default function SectionProjectMasonry(props) {
  const { data } = props;
  const theme = useTheme();
  // ! Need to disable SSR to have proper matches on initial load.
  // ! https://github.com/mui-org/material-ui/pull/23806/files
  const matchesMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    noSsr: true,
  });
  const matchesTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'), {
    noSsr: true,
  });
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const [initialTileData, setInitialTileData] = useState([]);
  const [tileData, setTileData] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  // * Desktop matches first then mobile to cover max and min.
  const targetBlockWidth = matchesDesktop
    ? deviceColumnWidth.desktop
    : matchesMobile
    ? deviceColumnWidth.mobile
    : deviceColumnWidth.tablet;

  useEffect(() => {
    const gridListTypesCollectionItems =
      data?.sectionType.gridList?.gridListTypesCollection?.items;

    // Combine all tile data into one single array of objects containing all projects.
    const allTileData = gridListTypesCollectionItems.flatMap(data => {
      // Add project type to each gridListTilesCollection for filtering later
      const combinedTileData = data?.gridListTilesCollection?.items.map(
        item => {
          return { ...item, type: data?.type };
        }
      );

      // A 3D array flattened to a 2D array.
      return combinedTileData;
    });

    const allProjectTypes = gridListTypesCollectionItems.map(item => item.type);

    setInitialTileData(allTileData);
    setTileData(allTileData);
    setTypes(['All', ...allProjectTypes]);
  }, [props.data]);

  const onFilterClick = type => {
    if (type === 'All') {
      setTileData(initialTileData);
    } else {
      const projectTileData = initialTileData.filter(
        data => data.type === type
      );
      setTileData(projectTileData);
    }

    setSelectedType(type);
  };

  const projectFilters = types.map((type, index) => (
    <LinkButton
      key={index}
      variant="h4"
      color="textSecondary"
      active={type === selectedType}
      onLinkButtonClick={() => {
        onFilterClick(type);
      }}
    >
      {type}
    </LinkButton>
  ));

  return (
    <SimpleReactLightbox>
      <SectionLayout>
        <Box mb={'10px'}>
          <RichTextBlock data={data.description?.json} isSectionTitle />
        </Box>
        <Box display="flex" justifyContent="center" marginBottom="20px">
          {projectFilters}
        </Box>
        <SRLWrapper>
          {/* Max columns for all device cases. */}
          <XMasonry maxColumns={6} targetBlockWidth={targetBlockWidth}>
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

              let imageWidth;
              let imageHeight;
              // Image requires width and height only if layout is not fill
              if (layout !== 'fill') {
                imageWidth = width || 400;
                imageHeight = height || 250;
              }

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

              return (
                <XBlock width={calcDimensions().xBlockWidth} key={image.sys.id}>
                  <Box
                    key={image.sys.id}
                    height={calcDimensions().xBlockHeight}
                    position="relative"
                    m={{ xs: 0.5, sm: 1, lg: 1 }}
                    // Required to show border-radius
                    overflow="hidden"
                    borderRadius={10}
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
                    />
                  </Box>
                </XBlock>
              );
            })}
          </XMasonry>
        </SRLWrapper>
      </SectionLayout>
    </SimpleReactLightbox>
  );
}
