import React from "react";
import { styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import ColorPickerForm from "./ColorPickerForm"
import PaletteFormNav from "./PaletteFormNav";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import DraggableColorList from "./DraggableColorList";
import { arrayMoveImmutable } from "array-move";

const drawerWidth = 400;
const maxColors = 20;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
     height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      }),
  }),
);



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const styles = {
    container: {
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
    },
    buttons: {
        width: "100%"
    },
    button: {
        width: "50%"
    }
}

 function PersistentDrawerLeft(props) {
  const [open, setOpen] = React.useState(false);
  // const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  // const [newName, setNewName] = React.useState("");



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
     setColors([...colors, newColor])
    };




    const savePalette = (palette) => {
        let newName= palette.name;
        const newPalette={paletteName: newName, colors: colors, id: newName.toLowerCase().replace(/ /g, "-"), emoji: palette.emoji};
        props.savePalette(newPalette);
        props.history.push("/");
    };


    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName))
    }
    const onSortEnd = ({oldIndex, newIndex}) => {
        setColors(
            arrayMoveImmutable(colors, oldIndex, newIndex)
        );
    };
    const clearColors = () => {
        setColors([])
    };
    const addRandomColor = () => {
        const allColors = props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        if (colors.length <= 19){setColors([...colors, randomColor])};
    };

  return (
    <Box sx={{ display: 'flex', justifyContent: "center",
    alignItems:"center", }}>
    <PaletteFormNav open={open} palettes={props.palettes} handleDrawerOpen={handleDrawerOpen} savePalette={savePalette}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={props.classes.container}>
        <Typography variant="h4" gutterBottom>
            Design your Palette!
        </Typography>
        <div className={props.classes.buttons}>
            <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
                className={props.classes.button}
            >
              Clear Palette
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                disabled={colors.length >= maxColors}
                className={props.classes.button}
            >
                Random Color
            </Button>
        </div>
        <ColorPickerForm maxColors={maxColors} addNewColor={addNewColor} colors={colors}/>

        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
            colors={colors}
            removeColor={removeColor}
            axis="xy"
            onSortEnd={onSortEnd}
        />
         </Main>
    </Box>
  );

}


export default withStyles(styles)(PersistentDrawerLeft);
