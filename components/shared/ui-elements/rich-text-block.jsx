import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import colors from '@/utility/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  subtitle: {
    ...theme.subtitle,
    marginBottom: '20px',
    // Need a deep merge since theme already contains the same key.
    [theme.breakpoints.up('md')]: {
      ...theme.subtitle[theme.breakpoints.up('md')],
      marginBottom: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      ...theme.subtitle[theme.breakpoints.up('lg')],
      marginBottom: '30px',
    },
  },
  h2Default: {
    textAlign: 'center',
    color: colors.white[400],
    marginBottom: '10px',
  },
  h2Type1: {
    color: colors.grey[400],
  },
  description: {
    ...theme.description,
  },
  description1: { color: colors.grey[400] },
}));

export default function RichTextBlock(props) {
  const {
    data,
    h2ClassName,
    descriptionClassName,
    isSubtitle,
    descriptionVariant,
  } = props;
  const classes = useStyles();
  const h2ClassNames = clsx(
    classes.h2Default,
    h2ClassName && classes[h2ClassName]
  );
  const descriptionClassNames = clsx(
    classes.description,
    descriptionClassName && classes[descriptionClassName]
  );

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Typography variant="h1">{children}</Typography>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Typography variant="h2" className={h2ClassNames}>
            {children}
          </Typography>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <Typography className={isSubtitle && classes.subtitle} variant="h3">
            {children}
          </Typography>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return (
          <Typography
            className={descriptionClassNames}
            variant={descriptionVariant}
          >
            {children}
          </Typography>
        );
      },
    },
    renderText: text =>
      text.split('\n').flatMap((text, i) => [i > 0 && <br key={i} />, text]),
  };

  return <>{documentToReactComponents(data, RICHTEXT_OPTIONS)}</>;
}

RichTextBlock.prototype = {
  data: PropTypes.object,
  isSectionTitle: PropTypes.bool,
  isSubtitle: PropTypes.bool,
  isDescription: PropTypes.bool,
};
