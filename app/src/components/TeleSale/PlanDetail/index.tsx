import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useStyles } from "./styles";
import { useStylesTeleSale } from "../styles";

export const PlanDetail = () => {
    const css = useStyles();
    const cssApp = useStylesTeleSale();
    return <Fragment>
        <Card className={css.root}>
            <CardHeader 
                title="รายละเอียดการเลือกแผน" 
                titleTypographyProps={{ variant: "h6" }}
                className={cssApp.cardHeader} />
            <CardContent>
                {'1. "list of plan selected"'} <br/>
                {'2. "list of plan selected"'}
            </CardContent>
        </Card>
    </Fragment>
}