import {
  Box,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Image from 'next/image';

import SectionLayout from '@/components/shared/layouts/section-layout';

const useStyles = makeStyles(theme => ({}));

export default function SectionClient(props) {
  const classes = useStyles();

  return (
    <SectionLayout>
      <Grid container spacing={2}>
        <Grid item sm style={{ position: 'relative', height: '400px' }}>
          <Box>
            <Image
              src="/client-card.svg"
              alt="Greenstone Wellness"
              layout="responsive"
              // objectFit="responsive"
              // objectPosition="bottom center"
              width={608}
              height={400}
              quality={45}
            />

            <Card
              className={null}
              variant="outlined"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '94%',
                margin: '0 auto',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  Green Stone Wellness Clinic
                </Typography>
                <Typography variant="body1" component="p">
                  Description and blurb here it will fade when sentences are too
                  long, like this one. The default of the card is faded white
                  and will show colour on HOVER. This feature is only for
                  Desktop, not for tablet or mobile.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        <Grid item sm style={{ position: 'relative' }}>
          <Image
            src="/client-card.svg"
            alt="Greenstone Wellness"
            layout="fill"
            objectFit="cover"
            // objectPosition="bottom center"
            // width={608}
            // height={400}
            quality={45}
          />
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
