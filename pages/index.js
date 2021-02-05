import { useState } from 'react';
import Particles from 'react-tsparticles';
import ResizeObserver from 'rc-resize-observer';
import Image from 'next/image';
import { Box, makeStyles } from '@material-ui/core';
import { useRef } from 'react';

import particlesOptions from '../src/particles.json';
import snowParticleOptions from '../src/snow-particles.json';
import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import SectionIntroduction from '@/components/pages/home/section-introduction';
import SectionProjectMasonry from '@/components/pages/home/section-project-masonry';
import SectionClient from '@/components/pages/home/section-client';

const useStyles = makeStyles(theme => ({
  mainTsParticles: {
    ...theme.particles,
    height: props => props.firstWrapperHeight,
  },
  secondTsParticles: {
    ...theme.particles,
    height: '800px',
  },
  // Styles retrieved by the default ones applied as inline styles
  canvas: {
    backgroundColor: 'rgb(13, 71, 161)',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'absolute !important',
    zIndex: 1,
    top: 0,
    left: 0,
    pointerEvents: 'initial',
  },
}));

function IndexPage(props) {
  const { preview, data, error } = props;
  const [firstWrapperHeight, setFirstWrapperHeight] = useState();
  const firstWrapperRef = useRef();
  const classes = useStyles({ ...props, firstWrapperHeight });

  // console.log(data);

  const isParticleBackground = data?.pageType?.isParticleBackground;
  const getSectionData = name => {
    return data?.sectionsCollection?.items.find(
      section => section?.sectionType?.__typename === name
    );
  };

  const introductionSectionData = getSectionData('SectionIntroduction');
  const projectSectionData = getSectionData('SectionProject');
  const clientSectionData = getSectionData('SectionClient');

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
        {true ? (
          <Particles
            className={classes.mainTsParticles}
            options={particlesOptions}
          />
        ) : (
          <div
            style={{
              backgroundColor: '#424242',
              height: firstWrapperHeight,
            }}
            className={classes.mainTsParticles}
          ></div>
        )}

        <ResizeObserver onResize={onResize}>
          <div ref={firstWrapperRef}>
            {introductionSectionData && (
              <SectionIntroduction data={introductionSectionData} />
            )}

            {projectSectionData && (
              <SectionProjectMasonry data={getSectionData('SectionProject')} />
            )}

            <Image
              src="/backgrounds/clouds-top.svg"
              alt="Clouds"
              layout="responsive"
              // objectFit="responsive"
              // objectPosition="bottom center"
              width={3000}
              height={300}
              quality={45}
            />
          </div>
        </ResizeObserver>

        <Box
          pt={{ xs: '50px', md: '100px', lg: '200px' }}
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {clientSectionData && <SectionClient data={clientSectionData} />}
        </Box>

        {/* Imitate tsParticles for now */}
        {true ? (
          <Box position="relative">
            <Box position="absolute" height="300px" width="100%">
              <Image
                src="/backgrounds/clouds-bottom.svg"
                alt="Clouds"
                layout="responsive"
                // objectFit="responsive"
                // objectPosition="bottom center"
                width={3000}
                height={300}
                quality={45}
              />
            </Box>
            <Particles
              className={classes.secondTsParticles}
              canvasClassName={classes.canvas}
              options={snowParticleOptions}
            />
          </Box>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              height: '500px',
            }}
            className={classes.secondTsParticles}
          ></div>
        )}
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const { data, error } = await getDataForIndex(preview);

  return {
    props: { preview, data, error },
    revalidate: 1,
  };
}

export default IndexPage;
