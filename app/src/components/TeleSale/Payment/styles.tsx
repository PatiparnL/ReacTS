import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fullWidth: true
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  scaleLabel: {
    transform: "translate(0, 1.5px) scale(0.75)",
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
  autocompleteinput: {
    paddingTop: '0px !important',
    paddingBottom: '3px !important'
  },
  labeloutlined: {
    top: '-7px'
  },
  popupIndicator: {
    top: '-3px'
  },
  borderPlan : {
    m: 1,
    border: 1,
    borderColor:"grey.300",
    padding: "1em" ,
    borderRadius:"borderRadius"
  }
}));