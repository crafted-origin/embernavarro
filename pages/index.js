import { useState } from 'react';
import Particles from 'react-tsparticles';
import ResizeObserver from 'rc-resize-observer';

import particlesOptions from '../src/particles.json';
import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import IntroductionSection from '@/components/pages/home/introduction-section';
import ProjectSectionMasonry from '@/components/pages/home/project-section-masonry';
import { makeStyles } from '@material-ui/core';
import { useRef } from 'react';

const useStyles = makeStyles(theme => ({
  mainTsParticles: {
    ...theme.particles,
    height: props => props.projectSectionHeight,
  },
  secondTsParticles: {
    height: '500px',
  },
}));

function IndexPage(props) {
  const { preview, data, error } = props;
  const [firstWrapperHeight, setFirstWrapperHeight] = useState();
  const firstWrapperRef = useRef();
  const classes = useStyles();

  // console.log(data);

  const getSectionData = name => {
    return data?.sectionsCollection?.items.find(
      section => section?.sectionType?.__typename === name
    );
  };

  const introductionSectionData = getSectionData('SectionIntroduction');
  const projectSectionData = getSectionData('SectionProject');

  const onResize = resizeObserverProps => {
    setFirstWrapperHeight(resizeObserverProps.height);
  };

  if (error) {
    return (
      <span style={{ color: 'red' }}>{JSON.stringify(error, null, 4)}</span>
    );
  }

  if (!data) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Layout preview={preview}>
        {/* <Particles
          className={classes.mainTsParticles}
          options={particlesOptions}
        /> */}
        {/* tsParticles substitute */}

        {/* Imitate tsParticles for now */}
        <div
          style={{
            backgroundColor: 'lightblue',
            height: firstWrapperHeight,
          }}
          className={classes.mainTsParticles}
        ></div>

        <ResizeObserver onResize={onResize}>
          <div ref={firstWrapperRef}>
            {introductionSectionData && (
              <IntroductionSection data={introductionSectionData} />
            )}
            <div style={{ height: '500px' }}></div>

            {projectSectionData && (
              <ProjectSectionMasonry data={getSectionData('SectionProject')} />
            )}
          </div>
        </ResizeObserver>

        {/* Imitate tsParticles for now */}
        <div
          style={{
            backgroundColor: '#ccc',
          }}
          className={classes.secondTsParticles}
        ></div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const { data, error } = await getDataForIndex(preview);

  return {
    props: { preview, data, error },
  };
}

export default IndexPage;
