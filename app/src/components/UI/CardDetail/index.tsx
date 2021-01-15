import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
    makeStyles,
    Card,
    CardContent,
    Grid,
    Button,
    ButtonBase,
    Typography,
    Divider,
    FormControlLabel
} from "@material-ui/core";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import DefaultImg from "../../../assets/images/productGroups/default.png";

import { useRecoilState } from 'recoil';
import {
    ListQuotaPlan
} from "../../../stores/recoil/product";
import { TaskInsurerDetail_Response, CoverageDetail } from "../../../models/telesale";
interface Props {
    isShowButtonDetail: boolean
    plan: TaskInsurerDetail_Response
    max: number
}

export const CardDetail: React.FC<Props> = ({ isShowButtonDetail, plan, max }) => {
    const css = useStyles();
    const [state, setState] = useState(false);
    const [listQuotaPlan, setListQuotaPlan] = useRecoilState(ListQuotaPlan);

    useEffect(() => {
        if (listQuotaPlan.findIndex(f => f.productkey == plan.productkey) != -1)
            setState(true)
    }, [max])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, productKey: string) => {
        if (event.target.checked) {
            if (listQuotaPlan.findIndex(f => f.productkey == plan.productkey) == -1) {
                let obj = {
                    productkey: productKey,
                    amount: 1
                }
                setListQuotaPlan([...listQuotaPlan, obj])
            }
        }
        else {
            setListQuotaPlan(listQuotaPlan.filter(m => m.productkey !== productKey))
        }
        setState(event.target.checked);
    };

    const RenderCoverageDetail = (data: CoverageDetail[]) => {
        let maxDetail: number = max
        return (
            data.map((d, i) => {
                if (i == 0) {
                    return (
                        <Grid item xs={12}>
                            <span className={css.textleftHeader}>
                                {d.coveragetext}
                            </span>
                            <span className={css.textrightHeader}>
                                {d.coveragevalue}
                            </span>
                        </Grid>
                    )
                } else {
                    if (data.length == i + 1) {
                        let count = (maxDetail - data.length) + 1
                        return (
                            Array.from(Array(count).keys()).map((j: number, i: number) => {
                                if (i == 0) {
                                    return (
                                        <Grid item xs={12} className={css.pl1}>
                                            <span className={css.textleft}>
                                                {d.coveragetext}
                                            </span>
                                            <span className={css.textright}>
                                                {d.coveragevalue}
                                            </span>
                                        </Grid>
                                    )
                                } else {
                                    return (
                                        <Grid item xs={12} className={css.pl1 + ' ' + css.pt23}>
                                            <span className={css.textleft}>
                                                <span> </span>
                                            </span>
                                            <span className={css.textright}>
                                                <span> </span>
                                            </span>
                                        </Grid>
                                    )
                                }
                            })
                        )
                    }
                    else {
                        return (
                            <Grid item xs={12} className={css.pl1}>
                                <span className={css.textleft}>
                                    {d.coveragetext}
                                </span>
                                <span className={css.textright}>
                                    {d.coveragevalue}
                                </span>
                            </Grid>
                        )
                    }
                }
            })
        )
    }

    return (
        <Card
            style={{ height: "auto", width: "325px" }}
        >
            <CardContent style={{ height: "auto" }}>
                <div className={css.root}>
                    <Grid
                        container
                        spacing={1}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <ButtonBase className={css.image}>
                                <img className={css.img} alt="complex" src={DefaultImg} />
                            </ButtonBase>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" style={{ lineHeight: '1.3em' }}>
                                {plan?.producttypename}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" style={{ lineHeight: '1.3em' }}>
                                {plan?.productname}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Divider />
                            <div style={{ marginTop: '0.5em' }}>
                                <Typography variant="h5" style={{ display: 'inline-block' }}>
                                    {plan?.premium}
                                </Typography> {plan?.premiummode}
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={css.root} style={{ lineHeight: '1.1em' }}>
                    <Grid container spacing={1}>
                        {
                            max ? RenderCoverageDetail(plan?.coverageshortdetails as CoverageDetail[]) : null
                        }
                    </Grid>
                </div>
                {isShowButtonDetail ?
                    <React.Fragment>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth>
                                    รายละเอียด
                            </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    :
                    <Grid container style={{ marginTop: '1em' }}>
                        <Grid item xs={12} className={css.gridcheckbox}>
                            <FormControlLabel className={css.formcheckbox}
                                control={
                                    <GreenCheckbox checked={state} onChange={(e) => { handleChange(e, plan.productkey) }} name="checkboxplan" />
                                }
                                label={
                                    <span style={{ position: 'relative', top: '3px' }}>เลือก</span>
                                }
                            />
                        </Grid>
                    </Grid>
                }
            </CardContent>
        </Card >
    )
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: '0.5em'
    },
    image: {
        width: 60,
        height: 60,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '20px'
    },
    gridcheckbox: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '4px'
    },
    formcheckbox: {
        width: '100%',
        display: 'block',
        margin: '-4px'
    },
    icon: {
        padding: '0px',
    },
    textleftHeader: {
        float: 'left',
        fontWeight: 'bold'
    },
    textrightHeader: {
        float: 'right',
        fontWeight: 'bold'
    },
    textleft: {
        float: 'left',
    },
    textright: {
        float: 'right',
    },
    pl1: {
        paddingLeft: '1em !important'
    },
    pt23: {
        paddingTop: '23px !important'
    }
}))