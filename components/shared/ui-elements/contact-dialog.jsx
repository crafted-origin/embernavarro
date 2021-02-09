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
} from '@material-ui/core';

import ClientOnlyPortal from '@/components/shared/layouts/client-only-portal';

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
};

export default function ContactDialog(props) {
  const { isOpenContact, handleContactClick } = props;

  return (
    <ClientOnlyPortal selector="#contact-hook">
      <Dialog
        open={true}
        onClose={() => handleContactClick(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact Me</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
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
                .min(20)
                .max(100),
            })}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {}}
          >
            {({ values, errors, isSubmitting, isValidating, touched }) => (
              <Form noValidate autoComplete="off">
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
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleContactClick(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleContactClick(false)} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </ClientOnlyPortal>
  );
}
