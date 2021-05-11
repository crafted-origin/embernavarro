import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import { Box, Button, makeStyles, Fab } from '@material-ui/core';
import { MailOutlined } from '@material-ui/icons';

import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import SectionIntroduction from '@/components/pages/home/section-introduction';
import SectionProjectMasonry from '@/components/pages/home/section-project-masonry';
import SectionClient from '@/components/pages/home/section-client';
import SectionThankYou from '@/components/pages/home/section-thank-you';
import Footer from '@/components/shared/layouts/footer';
import ContactDialog from '@/components/shared/ui-elements/contact-dialog';
import {
  HOME_URL,
  HOME_TITLE,
  HOME_DESCRIPTION,
  HOME_OG_IMAGE_URL,
  HOME_OG_TITLE,
  HOME_OG_DESCRIPTION,
} from '@/lib/constants';

const useStyles = makeStyles(theme => ({
  contactButton: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '0 1rem 1rem 0',
    zIndex: 1,
  },
}));

function IndexPage(props) {
  const { preview, data, error } = props;
  const classes = useStyles();
  const [isOpenContact, setIsOpenContact] = useState(false);

  const handleContactClick = toggle => {
    setIsOpenContact(toggle);
  };

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
      <Head>
        <title key="title">{HOME_TITLE}</title>
        <meta name="description" key="description" content={HOME_DESCRIPTION} />
        <meta key="og:title" property="og:title" content={HOME_OG_TITLE} />
        <meta property="og:description" content={HOME_OG_DESCRIPTION} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="2037" />
        <meta property="og:image:height" content="1170" />
        <meta key="og:url" property="og:url" content={HOME_URL} />
        <link key="canonical" rel="canonical" href={HOME_URL} />
      </Head>
      <ContactDialog
        handleContactClick={handleContactClick}
        isOpenContact={isOpenContact}
      />
      <Fab
        onClick={() => handleContactClick(true)}
        className={classes.contactButton}
        color="primary"
        aria-label="contact"
      >
        <MailOutlined />
      </Fab>
      <Layout preview={preview}>
        {introductionSectionData && (
          <SectionIntroduction data={introductionSectionData} />
        )}

        {projectSectionData && (
          <SectionProjectMasonry data={projectSectionData} />
        )}

        <Box
          width="100%"
          position="relative"
          height={{ xs: '56px', md: '115px', lg: '268px' }}
        >
          <Image
            src="/backgrounds/waves.svg"
            alt="Wind"
            layout="fill"
            objectFit="cover"
            objectPosition="45%"
            quality={45}
          />
        </Box>

        <Box
          pt={{ xs: '50px', md: '100px', lg: '200px' }}
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {clientSectionData && <SectionClient data={clientSectionData} />}
        </Box>

        <Box
          position="relative"
          minHeight={{ xs: '300px', md: '480px', lg: '830px' }}
        >
          <Box
            width="100%"
            position="absolute"
            height={{ xs: '100px', md: '133px', lg: '300px' }}
          >
            <Image
              src="/backgrounds/clouds-bottom.png"
              alt="Clouds"
              layout="fill"
              objectFit="cover"
            />
          </Box>

          <Box
            position="absolute"
            bottom="0"
            width="100%"
            height={{ xs: '213px', md: '328px', lg: '521px' }}
          >
            <Image
              src="/backgrounds/autumn-trees.svg"
              alt="Autumn with trees"
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
        <Box width="100%" position="absolute" bottom="0">
          {data?.footer && <Footer data={data.footer} />}
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
