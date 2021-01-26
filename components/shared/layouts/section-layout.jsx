import { Box, useTheme } from '@material-ui/core';

export default function SectionLayout(props) {
  const { mb, children } = props;
  const theme = useTheme();

  return (
    <Box
      className="section-layout"
      maxWidth={{
        xs: theme.breakpoints.values.xs,
        sm: theme.breakpoints.values.sm,
        lg: theme.breakpoints.values.lg,
      }}
      mx="auto"
      mb={mb}
      px={2.5}
    >
      {children}
    </Box>
  );
}
