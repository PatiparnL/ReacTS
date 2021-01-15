import { Step, StepLabel, Stepper } from "@material-ui/core";
import React, { Fragment, memo } from "react";

interface MainStepperProps {
    steps: string[],
    activeStep: number
}

const Bar: React.FC<MainStepperProps> = ({ steps, activeStep }) => {
    return <Fragment>
        <Stepper activeStep={activeStep} alternativeLabel >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
}

export const StepperBar = memo(Bar);