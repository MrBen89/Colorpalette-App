import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {Link} from "react-router-dom";
import styles from "./styles/PaletteListStyles"
import { withStyles } from "@material-ui/styles";

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state= {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    openDialog(id){
        this.setState({openDeleteDialog: true, deletingId: id})
    };
    closeDialog(){
        this.setState({openDeleteDialog: false, deletingId: ""})
    }
    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }

    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    render(){
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1> React Colors </h1>
                    <Link to="/palette/new"> Create Palette </Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition
                            key={palette.id}
                            classNames="fade"
                            timeout={500}>
                            <MiniPalette {...palette}
                                handleClick={() => this.goToPalette(palette.id)}
                                // deletePalette = {this.props.deletePalette}
                                openDialog= {this.openDialog}
                                key = {palette.id}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={this.state.openDeleteDialog}
                    aria-labelledby="delete-dialog-title"
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar >
                            <ListItemText  sx={{ color: blue[600]}}> Delete </ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar  sx={{ backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar >
                            <ListItemText sx={{ color: red[600]}}> Cancel </ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(PaletteList);
