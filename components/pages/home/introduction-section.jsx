import { Container, Grid, Typography } from '@material-ui/core';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="h1">{children}</Typography>
        </Grid>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="h2">{children}</Typography>
        </Grid>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <Grid item xs={12}>
          <Typography variant="body1">{children}</Typography>
        </Grid>
      );
    },
  },
};

export default function IntroductionSection(props) {
  const { data } = props;

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {documentToReactComponents(data, RICHTEXT_OPTIONS)}
      </Grid>
    </Container>
  );
}
