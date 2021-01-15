import React, { useState } from "react";
import { useStyles } from "./styles";
import { useRecoilState } from 'recoil';
import { ListQuotaPlan } from "../../../stores/recoil/product";
import { Button } from "@material-ui/core";
import { Alerts } from "../Alert";
import { GetAlert, RecoilAlert } from "../../../stores/recoil/alert";

interface StepContentProps {
    steps: string[],
    activeStep: number,
    handleNext: () => void,
    handleBack: () => void,
}

export const StepContent: React.FC<StepContentProps> = ({ children, steps, activeStep, handleNext, handleBack }) => {
    const classes = useStyles();

    const [alert, setAlert] = useRecoilState(GetAlert);
    const [listQuotaPlan, setListQuotaPlan] = useRecoilState(ListQuotaPlan);

    const handleButtonNext = () => {
        switch (activeStep) {
            case 0:
                return Step0();
            default:
                return handleNext();
        }
    }

    const Step0 = () => {
        if (listQuotaPlan.length > 0) {
            handleNext()
        } else {
            setAlert({ open: true, message: 'Select Plan !!!!!!!!!!!!!' } as RecoilAlert)
        }
    }

    return <div>
        {children}
        <Button
            disabled={activeStep === 0}
            className={classes.button}
            onClick={handleBack}
        >
            Back
        </Button>
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleButtonNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        <Alerts/>
    </div>
}
