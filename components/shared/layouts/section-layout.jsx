import { Box } from '@material-ui/core';

export default function SectionLayout(props) {
  const { children } = props;

  return (
    <Box maxWidth={{ xs: 412, sm: 846, lg: 1272 }} mx="auto" px={2.5}>
      {children}
    </Box>
  );
}
