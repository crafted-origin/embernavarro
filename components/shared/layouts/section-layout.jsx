import { Box, useTheme } from '@material-ui/core';

export default function SectionLayout(props) {
  const { children } = props;
  const theme = useTheme();

  return (
    <Box
      maxWidth={{
        mobile: theme.breakpoints.values.mobile,
        tablet: theme.breakpoints.values.tablet,
        desktop: theme.breakpoints.values.desktop,
      }}
      mx="auto"
      pb={4}
      px={2.5}
    >
      {children}
    </Box>
  );
}
