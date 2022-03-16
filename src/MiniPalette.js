import React from "react";
import styles from "./styles/MiniPaletteStyles";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette(props){
    const{classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));

    return (

        <div className={classes.root} onClick={props.handleClick}>
            <DeleteIcon
                className={classes.deleteIcon}
                sx={{transition: "all 0.3s ease-in-out"}}
                onClick={(e) => {e.stopPropagation(); props.openDialog(props.id)}}
            />
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                { paletteName } <span className={classes.emoji}>{ emoji }</span>
            </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);
