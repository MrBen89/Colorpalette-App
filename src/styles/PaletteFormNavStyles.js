import sizes from "./sizes";

const styles = {
    root: {
        display: "flex",
        color: "purple"
    },
    navBtns: {
        marginRight: "0.5rem",
        "& a": {
            textDecoration: "none"
        },
        [sizes.down("sm")]: {
            marginRight: "0rem"
        }
    },
    button: {
        margin: "0 0.5rem"
    },
    [sizes.down("sm")]: {
        margin: "0rem",
        padding: "0.2rem"
    },
    AppBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
    }
}

export default styles;
