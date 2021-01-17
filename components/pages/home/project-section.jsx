import { useState, useEffect } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Image from 'next/image';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import SectionLayout from '@/components/shared/layouts/section-layout';

export default function ProjectSection(props) {
  const { data } = props;
  const [initialTileData, setInitialTileData] = useState([]);
  const [tileData, setTileData] = useState([]);
  const [types, setTypes] = useState([]);

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
  };

  const projectFilters = types.map((type, index) => (
    <button key={index} onClick={() => onFilterClick(type)}>
      {type}
    </button>
  ));

  return (
    <SimpleReactLightbox>
      <SectionLayout>
        {projectFilters}
        <SRLWrapper>
          <GridList
            spacing={16}
            cellHeight={200}
            className={null}
            style={{ height: '600px' }}
            cols={4}
          >
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
                columns,
                rows,
              } = tile;

              let imageWidth;
              let imageHeight;
              {
                /* Image requires width and height only if layout is not fill */
              }
              if (layout !== 'fill') {
                imageWidth = width || 400;
                imageHeight = height || 250;
              }

              let sizes;
              if (layout === 'fill' || layout === 'responsive') {
                sizes =
                  '(min-width: 767px) 33vw, (min-width: 568px) 50vw, 100vw';
              }

              return (
                <GridListTile
                  key={image.sys.id}
                  cols={columns || 2}
                  rows={rows || 2}
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
                    // sizes={sizes}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </SRLWrapper>
      </SectionLayout>
    </SimpleReactLightbox>
  );
}
