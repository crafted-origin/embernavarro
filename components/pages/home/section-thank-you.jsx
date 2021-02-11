import { Box } from '@material-ui/core';

import SectionLayout from '@/components/shared/layouts/section-layout';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

export default function SectionThankYou(props) {
  const { data } = props;

  return (
    <SectionLayout pt="1px">
      <Box mt={{ xs: '80px' }}>
        <RichTextBlock data={data.description.json} />
        <button>Hello</button>
      </Box>
    </SectionLayout>
  );
}
