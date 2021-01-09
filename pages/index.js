import Layout from '@/components/shared/layouts/layout';
import { getDataForIndex } from '@/lib/api';

function IndexPage(props) {
  const { preview, data, error } = props;
  console.log({ data }, { error });

  return (
    <>
      <Layout preview={preview}>
        <div>Home page</div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  console.log(preview);
  const { data, error } = await getDataForIndex(preview);

  return {
    props: { preview, data, error },
  };
}

export default IndexPage;
