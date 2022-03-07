import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(true);
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
     <Dialog open={open} onClose={props.hideForm}>
        <DialogTitle>Choose a palette name</DialogTitle>
         <ValidatorForm onSubmit={() => props.savePalette(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new Palette. Make sure its unique!
          </DialogContentText>
          <Picker />

                <TextValidator
                  name="newPaletteName"
                  label="Palette Name"
                  fullWidth
                  margin="normal"
                  value={newPaletteName}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["Enter Palette Name"]}
                  autoFocus
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hideForm}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
          Save Palette </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>

  );
}
