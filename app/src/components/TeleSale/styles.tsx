import { makeStyles } from "@material-ui/core";

export const useStylesTeleSale = makeStyles((theme) => ({
    cardHeader: {
        backgroundImage: 'linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%)',
        color: 'black',
        fontWeight: 'bold',
        padding: 5,
        paddingLeft: 20,
    },
    labeloutlined: {
        top: '-7px'
    },
    autocompleteinput: {
        paddingTop: '0px !important',
        paddingBottom: '3px !important'
    },
    popupIndicator: {
        top: '-3px'
    },
    endAdornment:{
        top: 'calc(50% - 16px)'
    },
    paddingAccordion: {
        padding: '0px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    marginAccordion: {
        margin: '0px'
    },
    expandIconAccordion: {
        marginRight: '0px',
        padding: '0px'
    },
}));