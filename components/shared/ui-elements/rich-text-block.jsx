import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import colors from '@/utility/colors';

const useStyles = makeStyles(theme => ({
  subtitle: {
    ...theme.subtitle,
    marginBottom: '20px',
    // Need a deep merge since theme already contains the same key.
    [theme.breakpoints.up('sm')]: {
      ...theme.subtitle[theme.breakpoints.up('sm')],
      marginBottom: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      ...theme.subtitle[theme.breakpoints.up('lg')],
      marginBottom: '30px',
    },
  },
  description: {
    ...theme.description,
  },
  sectionTitle: {
    textAlign: 'center',
    color: colors.white[400],
    marginBottom: '10px',
  },
}));

export default function RichTextBlock(props) {
  const { data, isSectionTitle, isSubtitle, isDescription } = props;
  const classes = useStyles();

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return <Typography variant="h1">{children}</Typography>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Typography
            variant="h2"
            className={isSectionTitle && classes.sectionTitle}
          >
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
            className={isDescription && classes.description}
            variant="body1"
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
