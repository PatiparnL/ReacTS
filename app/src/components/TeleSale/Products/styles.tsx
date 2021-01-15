import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        margin: '0px 2em 0px 2em'
    },
    appBar: {
        position: 'relative',
        marginBottom: '2em'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    cardHeader: {
        backgroundColor: '#6573c3',
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        paddingLeft: 20
    },
    tab: {
        height: 160,
        margin: 2,
        padding: 5
    },
    motion: {
        width: '100%',
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    whileHover: {
        scale: 1.1
    },
    card: {
        width: '135px',
        height: '135px'
    },
    imgwh: {
        width: "100%",
        height: "100%"
    }
}));