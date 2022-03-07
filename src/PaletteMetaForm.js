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
  const [stage, setStage] = React.useState("name");
  const [newPaletteName, setNewPaletteName] = React.useState("");

  const handleClickOpen = () => {
    setStage("name");
  };

  const handleClose = () => {
    setStage("");
  };

 const handleChange = (evt) => {
       setNewPaletteName(evt.target.value);
  };

  const showEmojiPicker = () => {
      setStage("emoji");
  };

  const storePalette = (emoji) => {
      const newPalette = {name: newPaletteName, emoji: emoji.native}
      props.savePalette(newPalette)
  }

  return (
      <div>
      <Dialog open={stage === "emoji"} onClose={props.hideForm}>
      <DialogTitle id="form-dialog-title">
        Pick an emoji for your palette
      </DialogTitle>
            <Picker onSelect={storePalette} />
      </Dialog>
     <Dialog open={stage === "name"} onClose={props.hideForm}>
        <DialogTitle>Choose a palette name</DialogTitle>
         <ValidatorForm onSubmit={showEmojiPicker}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new Palette. Make sure its unique!
          </DialogContentText>
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
      </div>
  );
}
