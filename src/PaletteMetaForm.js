import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setNewPaletteName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const handleChange = (evt) => {
       setNewPaletteName(evt.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
           <ValidatorForm onSubmit={() => props.savePalette(newPaletteName)}>
                <TextValidator
                  name="newPaletteName"
                  label="Palette Name"
                  value={newPaletteName}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["Enter Palette Name"]}
                  autoFocus
                />

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette </Button>
            </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
