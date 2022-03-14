import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import styles from "./styles/ColorPickerFormStyles";



class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = { currentColor: "teal", newColorName: ""};
        this.updateCurrentcolor = this.updateCurrentcolor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule("isColorUnique", value =>
                this.props.colors.every(
                    ({ color }) => color !== this.state.currentcolor)
                );
    }

    updateCurrentcolor(newColor) {
        this.setState({ currentColor: newColor.hex});
    };

    handleChange(evt) {
         this.setState({newColorName: evt.target.value});

     };

     handleSubmit() {
         const newColor = {
             color: this.state.currentColor,
             name: this.state.newColorName
         };
         this.props.addNewColor(newColor);
         this.setState({newColorName: ""})
     };
    render() {
        const { maxColors, colors, classes } = this.props;
        const { currentColor } = this.state;
        return (
            <div className={classes.container}>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentcolor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref="form">
                    <TextValidator
                        value={this.state.newColorName}
                        name="newColorName"
                        className={classes.colorNameInput}
                        placeholder="Color Name"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Please enter a color name", "Please enter a unique name", "Color already used"]}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{backgroundColor: colors.length >= maxColors ? "grey" : currentColor}}
                        type="submit"
                        disabled={colors.length >= maxColors}
                        className={classes.addColor}
                    >
                    {colors.length >= maxColors ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);
