import { Box, useTheme } from '@material-ui/core';

export default function SectionLayout(props) {
  const { mb, children, ...rest } = props;
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
      pb={4}
      px={{ xs: '15px', sm: '17px', lg: '20px' }}
      {...rest}
    >
      {children}
    </Box>
  );
}
