import { useState } from 'react';
import Particles from 'react-tsparticles';
import Image from 'next/image';
import { Button, Box, makeStyles } from '@material-ui/core';

import particlesOptions from '../src/particles.json';
import snowParticleOptions from '../src/snow-particles.json';
import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import SectionIntroduction from '@/components/pages/home/section-introduction';
import SectionProjectMasonry from '@/components/pages/home/section-project-masonry';
import SectionClient from '@/components/pages/home/section-client';
import ContactDialog from '@/components/shared/ui-elements/contact-dialog';

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
  const [isOpenContact, setIsOpenContact] = useState(false);

  const handleContactClick = toggle => {
    setIsOpenContact(toggle);
  };

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
      <ContactDialog
        handleContactClick={handleContactClick}
        isOpenContact={isOpenContact}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleContactClick(true)}
      >
        Open form dialog
      </Button>
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
            <SectionProjectMasonry data={getSectionData('SectionProject')} />
          )}

          <Image
            src="/backgrounds/clouds-top.svg"
            alt="Clouds"
            layout="responsive"
            width={3000}
            height={300}
            quality={45}
          />
        </Box>

        <Box
          pt={{ xs: '50px', md: '100px', lg: '200px' }}
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {clientSectionData && <SectionClient data={clientSectionData} />}
        </Box>

        <Box position="relative">
          <Box position="absolute" height="300px" width="100%">
            <Image
              src="/backgrounds/clouds-bottom.svg"
              alt="Clouds"
              layout="responsive"
              width={3000}
              height={300}
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
                minHeight: '500px',
              }}
              className={classes.tsParticles}
            ></div>
          )}

          {/* Continue content here */}
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
