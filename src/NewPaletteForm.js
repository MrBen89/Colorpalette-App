import React from "react";
import { styled } from '@mui/material/styles';
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



export default function PersistentDrawerLeft(props) {
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




    const savePalette = (newPaletteName) => {
        let newName= newPaletteName;
        const newPalette={paletteName: newName, colors: colors, id: newName.toLowerCase().replace(/ /g, "-")};
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
    <Box sx={{ display: 'flex' }}>
    <PaletteFormNav open={open} palettes={props.palettes} handleDrawerOpen={handleDrawerOpen} savePalette={savePalette}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
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
        <Typography variant="h4">
            Design your Palette!
        </Typography>
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                disabled={colors.length >= maxColors}
            >
                Random Color
            </Button>
        </div>
        <ColorPickerForm maxColors={maxColors} addNewColor={addNewColor} colors={colors}/>

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
