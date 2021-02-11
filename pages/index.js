import Particles from 'react-tsparticles';
import Image from 'next/image';
import { Box, makeStyles, Typography } from '@material-ui/core';

import particlesOptions from '../src/particles.json';
import snowParticleOptions from '../src/snow-particles.json';
import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import SectionIntroduction from '@/components/pages/home/section-introduction';
import SectionProjectMasonry from '@/components/pages/home/section-project-masonry';
import SectionClient from '@/components/pages/home/section-client';
import SectionThankYou from '@/components/pages/home/section-thank-you';

const useStyles = makeStyles(theme => ({
  tsParticles: {
    ...theme.particles,
  },
  canvas: {
    //* This is to override the inline styles provided by the library.
    position: 'static !important',
  },
}));

function IndexPage(props) {
  const { preview, data, error } = props;
  const classes = useStyles();

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
  const thankYouSectionData = getSectionData('SectionThankYou');

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
        <Box position="relative">
          {isParticleBackground ? (
            <Particles
              className={classes.tsParticles}
              canvasClassName={classes.canvas}
              options={particlesOptions}
            />
          ) : (
            <div
              style={{
                backgroundColor: '#424242',
              }}
              className={classes.tsParticles}
            ></div>
          )}
          {introductionSectionData && (
            <SectionIntroduction data={introductionSectionData} />
          )}

          {projectSectionData && (
            <SectionProjectMasonry data={projectSectionData} />
          )}

          <Box width="100%" position="relative" height={{ xs: '100px' }}>
            <Image
              src="/backgrounds/clouds-top.svg"
              alt="Clouds"
              layout="fill"
              objectFit="cover"
              quality={45}
            />
          </Box>
        </Box>

        <Box
          pt={{ xs: '50px', md: '100px', lg: '200px' }}
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {clientSectionData && <SectionClient data={clientSectionData} />}
        </Box>

        <Box
          position="relative"
          minHeight={{ xs: '300px', md: '480px', lg: '760px' }}
        >
          <Box
            width="100%"
            position="absolute"
            height={{ xs: '100px', md: '133px', lg: '200px' }}
          >
            <Image
              src="/backgrounds/clouds-bottom.svg"
              alt="Clouds"
              layout="fill"
              objectFit="cover"
              quality={45}
            />
          </Box>
          {isParticleBackground ? (
            <Particles
              className={classes.tsParticles}
              canvasClassName={classes.canvas}
              options={snowParticleOptions}
            />
          ) : (
            <div
              style={{
                backgroundColor: '#0d47a1',
              }}
              className={classes.tsParticles}
            ></div>
          )}

          <Box
            position="absolute"
            bottom="0"
            width="100%"
            height={{ xs: '213px', md: '328px', lg: '521px' }}
          >
            <Image
              src="/backgrounds/snow-trees.svg"
              alt="Snow with trees"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom center"
              quality={45}
            />
          </Box>

          {thankYouSectionData && (
            <SectionThankYou data={thankYouSectionData} />
          )}
        </Box>
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
