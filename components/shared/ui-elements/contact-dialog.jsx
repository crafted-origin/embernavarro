import React from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import ClientOnlyPortal from '@/components/shared/layouts/client-only-portal';

export default function ContactDialog(props) {
  const { isOpenContact, handleContactClick } = props;

  return (
    <ClientOnlyPortal selector="#contact-hook">
      <Dialog
        open={isOpenContact}
        onClose={() => handleContactClick(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact Me</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
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
