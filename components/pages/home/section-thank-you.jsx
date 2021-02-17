import { Box, Button, Grid, makeStyles } from '@material-ui/core';

import SectionLayout from '@/components/shared/layouts/section-layout';
import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

const useStyles = makeStyles(theme => ({
  containerButton: {
    textAlign: 'center',
  },
}));

export default function SectionThankYou(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <SectionLayout pt={{ xs: '80px', md: '150px', lg: '290px' }}>
      <Grid container justify="center" alignContent="center" spacing={1}>
        <Grid item xs={8} style={{ marginBottom: '20px' }}>
          <RichTextBlock data={data.description.json} />
        </Grid>
      </Grid>
      <Box width={192} mx="auto">
        <Button
          fullWidth
          variant="outlined"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          BACK TO TOP
        </Button>
      </Box>
    </SectionLayout>
  );
}
