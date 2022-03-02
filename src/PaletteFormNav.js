import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteFormNav(props) {

    const drawerWidth = 400;

    const [newPaletteName, setNewPaletteName] = React.useState("");

    const { open } = props;
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    const handlePaletteNameChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }



    return(
        <div>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="default">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={props.handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Persistent drawer
                </Typography>
                <ValidatorForm onSubmit={() => props.savePalette(newPaletteName)}>
                    <TextValidator
                      name="newPaletteName"
                      label="Palette Name"
                      value={newPaletteName}
                      onChange={handlePaletteNameChange}
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
                  <Link to="/">
                      <Button variant="contained" color="secondary"> Go Back </Button>
                  </Link>
                </ValidatorForm>
              </Toolbar>
            </AppBar>
        </div>
    )
};

export default PaletteFormNav;
