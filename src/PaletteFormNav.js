import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import PaletteMetaForm from "./PaletteMetaForm"
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
    root: {
        display: "flex",
        color: "purple"
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        }
    },
    button: {
        margin: "0 0.5rem"
    },
    AppBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
    }
}

function PaletteFormNav(props) {

    const drawerWidth = 400;
    const { classes } = props;

    const [newPaletteName, setNewPaletteName] = React.useState("");
    const [formShowing, setFormShowing] = React.useState(false);

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

    const showForm = () => {
        setFormShowing(true)
    }

    const hideForm = () => {
        setFormShowing(false)
    }

    return(
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                color="default"
                sx={{flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "64px"}}
            >
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
                  Create a Palette
                </Typography>

              </Toolbar>
              <div className={classes.navBtns}>
                  <Link to="/" sx={{textDecoration: 'none'}}>
                      <Button variant="contained" sx={{margin: "0 0.5rem"}} color="secondary"> Go Back </Button>
                  </Link>
                  <Button variant="contained" sx={{margin: "0 0.5rem", textDecoration: "none"}} onClick={showForm}>
                    Save Palette
                  </Button>
              </div>
            </AppBar>
            {formShowing && <PaletteMetaForm palettes={props.palettes} handleSubmit={props.handleSubmit} hideForm={hideForm}/>}
        </div>
    )
};

export default withStyles(styles)(PaletteFormNav);
