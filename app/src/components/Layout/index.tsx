import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { Fragment } from 'react';
import LayoutStyles from './styles';

import {
    useRecoilState
} from 'recoil';
import { Loading } from "../../stores/recoil/load";

const Layout: React.FC = ({ children }) => {
    const classes = LayoutStyles();
    const [loading, setLoading] = useRecoilState(Loading);

    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>{children}</div>
        </Fragment>
    );
}

export default Layout;