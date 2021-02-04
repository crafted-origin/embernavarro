import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography, IconButton } from '@material-ui/core';
import { StarBorder, Star } from '@material-ui/icons';
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
  h5: {
    marginBottom: '5px',
  },
  description: {
    color: colors.white[400],
    textAlign: 'center',
  },
  introductionDescription: {
    [theme.breakpoints.up('md')]: {
      width: `${674 / theme.typography.fontSize}rem`,
    },
    [theme.breakpoints.up('lg')]: {
      width: `${850 / theme.typography.fontSize}rem`,
    },
  },
  description1: { color: colors.grey[400] },
  clientCardDescription: {
    color: colors.grey[400],
    textAlign: 'left',
    width: '100%',
  },
}));

export default function RichTextBlock(props) {
  const {
    data,
    h2ClassName,
    h5ClassName,
    descriptionClassName,
    isSubtitle,
    descriptionVariant,
    isTitleWithIcon,
  } = props;
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorite(isFavorite => !isFavorite);
  };

  const h2ClassNames = clsx(
    classes.h2Default,
    h2ClassName && classes[h2ClassName]
  );

  const h5ClassNames = clsx(classes.h5, h5ClassName && classes[h5ClassName]);

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
      [BLOCKS.HEADING_5]: (node, children) => {
        if (isTitleWithIcon) {
          return (
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="favorite"
                edge="start"
                onClick={onFavoriteClick}
              >
                {isFavorite ? <Star /> : <StarBorder />}
              </IconButton>
              <Typography className={h5ClassNames} variant="h5">
                {children}
              </Typography>
            </Box>
          );
        }
        return (
          <Typography className={h5ClassNames} variant="h5">
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
  isSubtitle: PropTypes.bool,
  h2ClassName: PropTypes.string,
  h5ClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  descriptionVariant: PropTypes.string,
  isTitleWithIcon: PropTypes.boolean,
};
