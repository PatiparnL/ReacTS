import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Dialog,
    Grid,
    IconButton,
    Slide,
    Toolbar,
    Typography,
    makeStyles,
} from "@material-ui/core";

import { TransitionProps } from "@material-ui/core/transitions/transition";
import CloseIcon from "@material-ui/icons/Close";
import { CompareField } from "./Field";
import { CompareDetail } from "./Detail";
import { teleSaleService } from "../../../../services/telesale";
import { useRecoilState } from 'recoil';
import { Loading } from "../../../../stores/recoil/load";

interface Props {
    isOpenCompare: boolean,
    setIsOpenCompare: (isOpenCompare: boolean) => void
}

export const DialogCompare: React.FC<Props> = ({ isOpenCompare, setIsOpenCompare }) => {
    const classes = useStyles();

    const [loading, setLoading] = useRecoilState(Loading);

    const [groupProduct, setGroupProduct] = useState([]);

    useEffect(() => {
      
    }, [])


    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={isOpenCompare}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => { setIsOpenCompare(false) }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>View Compare</Typography>
                    </Toolbar>
                </AppBar>
                <Box style={{ margin: 40, marginBottom: 10 }}>
                    <Grid item xs={12}>
                        <CompareField></CompareField>
                    </Grid>
                </Box>
                <Box style={{ margin: 40, marginBottom: 10 }}>
                    <Grid item xs={12}>
                        <CompareDetail></CompareDetail>
                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment >
    );
}

export const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});