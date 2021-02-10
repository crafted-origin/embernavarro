import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { email, object, string } from 'yup';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  makeStyles,
} from '@material-ui/core';

//* Names are hashed so bots cannot freely guess them.
const formInfo = {
  name: { key: 'nameaert', value: '' },
  email: { key: 'emailiuhh', value: '' },
  message: { key: 'messageujfk', value: '' },
};

const initialValues = {
  [formInfo.name.key]: formInfo.name.value,
  [formInfo.email.key]: formInfo.email.value,
  [formInfo.message.key]: formInfo.message.value,
  //* Honeypot fields and values.
  name: '',
  email: '',
};

const FORM_STATE = {
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
};

const useStyles = makeStyles(theme => ({
  honey: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    zIndex: -1,
  },
}));

export default function ContactDialog(props) {
  const { isOpenContact, handleContactClick } = props;
  const [message, setMessage] = useState();
  const classes = useStyles();

  return (
    <Dialog
      open={isOpenContact}
      onClose={() => handleContactClick(false)}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        validationSchema={object({
          [formInfo.name.key]: string()
            .required('Name is required.')
            .min(2)
            .max(100),
          [formInfo.email.key]: string()
            .required('Email is required.')
            .email('Must be a valid email.'),
          [formInfo.message.key]: string()
            .required('Message is required.')
            .min(10)
            .max(100),
          //* Honey pot name and email client validation.
          name: string().max(0),
          email: string().max(0),
        })}
        initialValues={initialValues}
        onSubmit={async (values, formikBag) => {
          const { setStatus, resetForm } = formikBag;
          setMessage('Sending your message...');

          try {
            const response = await fetch('/api/mail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: values[formInfo.name.key],
                email: values[formInfo.email.key],
                message: values[formInfo.message.key],
              }),
            });

            const responseData = await response.json();

            if (!response.ok) {
              throw new Error(responseData.message);
            }

            resetForm();
            setStatus(FORM_STATE.SUCCESS);
            setMessage(responseData.message);
          } catch (err) {
            console.log(err);

            setStatus(FORM_STATE.ERROR);
            setMessage(
              err.message || 'Something went wrong, please try again.'
            );
          }
        }}
      >
        {props => {
          const { errors, isSubmitting, isValidating, touched, status } = props;

          return (
            <Form noValidate autoComplete="off">
              <DialogTitle id="form-dialog-title">Contact Me</DialogTitle>
              <DialogContent>
                <DialogContentText color="textPrimary">
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>
                <Field
                  name={formInfo.name.key}
                  as={TextField}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={
                    touched[formInfo.name.key] && !!errors[formInfo.name.key]
                  }
                  helperText={<ErrorMessage name={formInfo.name.key} />}
                />
                <Field
                  name={formInfo.email.key}
                  as={TextField}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={
                    touched[formInfo.email.key] && !!errors[formInfo.email.key]
                  }
                  helperText={<ErrorMessage name={formInfo.email.key} />}
                />
                <Field
                  name={formInfo.message.key}
                  as={TextField}
                  label="Message"
                  multiline
                  rows="4"
                  rowsMax="4"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={
                    touched[formInfo.message.key] &&
                    !!errors[formInfo.message.key]
                  }
                  helperText={<ErrorMessage name={formInfo.message.key} />}
                />
                {/* //* uncomment for client side honey pot validation. */}
                {/* <Field
                  name="name"
                  className={classes.honey}
                  as={TextField}
                  label="Name"
                />
                <Field
                  name="email"
                  className={classes.honey}
                  as={TextField}
                  label="Email"
                /> */}
                {status === FORM_STATE.SUCCESS && (
                  <Typography color="primary">{message}</Typography>
                )}
                {status === FORM_STATE.ERROR && (
                  <Typography color="error">{message}</Typography>
                )}
                {isSubmitting && (
                  <Typography color="primary">{message}</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  disabled={isSubmitting || isValidating}
                  color="primary"
                >
                  SEND MESSAGE
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
