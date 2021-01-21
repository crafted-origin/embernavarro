import { Box } from '@material-ui/core';

export default function SectionLayout(props) {
  const { children } = props;

  return (
    <Box
      maxWidth={{ mobile: 412, tablet: 846, desktop: 1272 }}
      mx="auto"
      pb={4}
      px={2.5}
    >
      {children}
    </Box>
  );
}
