import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';
import IntroductionSection from '@/components/pages/home/introduction-section';
import ProjectSection from '@/components/pages/home/project-section';

function IndexPage(props) {
  const { preview, data, error } = props;
  // console.log(data);

  const projectSectionData = data?.sectionsCollection?.items.find(
    section => section?.sectionType?.__typename === 'SectionProject'
  );

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
        {/* tsParticles substitute */}
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#eee',
            zIndex: '-1',
          }}
        ></div>
        {data?.introduction?.json && (
          <IntroductionSection data={data?.introduction?.json} />
        )}
        {projectSectionData && <ProjectSection data={projectSectionData} />}
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
