import React, { useEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useRecoilState } from 'recoil';
import { GetAlert, RecoilAlert } from "../../../stores/recoil/alert";

export const Alerts = () => {
    const vertical = 'bottom';
    const horizontal = 'center';
    const [alert, setAlert] = useRecoilState(GetAlert);

    const handleClose = () => {
        setAlert({ open: false, message: '' } as RecoilAlert)
    };

    return <React.Fragment>
        <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{ vertical, horizontal }}
            open={alert?.open}
            onClose={handleClose}
            key={vertical + horizontal}
        >
            <Alert onClose={handleClose} severity="error">
                {alert?.message}
            </Alert>
        </Snackbar>
    </React.Fragment>
}
