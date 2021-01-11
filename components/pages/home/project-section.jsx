import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useState } from 'react';
import SectionLayout from '@/components/shared/layouts/section-layout';

export default function ProjectSection(props) {
  const { data } = props;
  const allTileData = data.flatMap(data => {
    return data.projectImagesCollection.items;
  });

  const [tileData, setTileData] = useState(allTileData);

  return (
    <SectionLayout>
      <GridList spacing={30} className={null} style={{ height: '600px' }}>
        {tileData.map(tile => (
          <GridListTile
            key={tile.image.sys.id}
            cols={tile.columns}
            rows={tile.rows}
          >
            <img src={tile.image.url} alt={tile.image.description} />
          </GridListTile>
        ))}
      </GridList>
    </SectionLayout>
  );
}
