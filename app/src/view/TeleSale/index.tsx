import React, { Fragment, memo, useState } from "react";

import { Grid, Paper, Toolbar } from "@material-ui/core";
import { RootStore } from "../../stores/teleSale.store";
import { GetAuthorize } from "../../stores/actions/authorized.action";
import { connect } from "react-redux";
import { requireAuth } from "../../components/HOC/requireAuth";
import { useStyles } from "./styles";
import { ContentActive } from "../../components/TeleSale";
import { StepContent, StepperBar } from "../../components/UI";
import { Header } from "../../components/TeleSale/Header";
import Layout from "../../components/Layout";

//Back to top
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';


const TeleSale = () => {
  const classes = useStyles();
  const steps = [
    "เลือก Product",
    "ข้อมูลใบเสนอราคา",
    "ข้อมูลลูกค้า",
    "รายละเอียดผลิตภัณฑ์ / ข้อมูลความคุ้มครอง",
    "ข้อมูลการชำระเงิน",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => (prev !== steps.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  }; 

  return (
    <Layout>
      <Header title="IOS Verify Input: " haveShoppingIcon={true} />
      <Paper className={classes.paper}>
        <StepperBar steps={steps} activeStep={activeStep} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StepContent
              steps={steps}
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
            >
              <ContentActive step={activeStep} />
            </StepContent>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.scroll}>
              <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};


function ScrollTop(props: any) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={{ position: 'relative' }}>
        {children}
      </div>
    </Zoom>
  );
}

const mapStateToProps = (state: RootStore) => {
  return { auth: state.authorize.haveAuthorized };
};

const mapDispatchToProps = (dispatch: any): any => ({
  checkAuth: (token: string) => dispatch(GetAuthorize(token)),
});

// const ViewTeleSale = connect(mapStateToProps, mapDispatchToProps)(requireAuth(memo(TeleSale)))
const ViewTeleSale = memo(TeleSale);
export default ViewTeleSale;
