import PropTypes from 'prop-types';
import { Link, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import colors from '@/utility/colors';

const useStyles = makeStyles(theme => ({
  filterButton: {
    // Need more specificity to override default styles
    'button&': {
      margin: '0 22px',
      color: props =>
        props.isSelected ? theme.palette.action.active : colors.white[400],
    },
  },
  default: {
    color: props =>
      props.isSelected ? theme.palette.action.active : colors.blue[400],
    fontWeight: props => props.isSelected && 700,
    '&:hover': {
      color: theme.palette.action.hover,
      fontWeight: 700,
    },
    '&:active': {
      color: props => props.active && theme.palette.action.active,
    },
  },
}));

export default function LinkButton(props) {
  const {
    className,
    children,
    variant,
    color,
    onLinkButtonClick,
    isSelected,
    ...rest
  } = props;
  const classes = useStyles(props);
  const combinedClassNames = clsx(classes.default, classes[className]);

  return (
    <Link
      className={combinedClassNames}
      variant={variant}
      color={color}
      onClick={onLinkButtonClick}
      underline="none"
      {...rest}
    >
      {children}
    </Link>
  );
}

LinkButton.prototype = {
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
  ]),
  onLinkButtonClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
