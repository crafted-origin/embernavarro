import PropTypes from 'prop-types';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  filterButton: props => ({
    backgroundColor: props.backgroundColor,
    margin: '0 22px',
    color: props.active && theme.palette.action.active,
    fontWeight: props.active && 700,
    '&:hover': {
      color: theme.palette.action.hover,
      fontWeight: 700,
    },
    '&:active': {
      color: props => props.active && theme.palette.action.active,
    },
  }),
}));

export default function LinkButton(props) {
  const {
    children,
    variant,
    color,
    onLinkButtonClick,
    active,
    ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <Link
      className={classes.filterButton}
      component="button"
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
  active: PropTypes.bool,
};
