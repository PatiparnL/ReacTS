import { Card, CardContent, CardHeader, Grid, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { useStyles } from "./styles";
import { useStylesTeleSale } from "../../TeleSale/styles"
import DescriptionIcon from '@material-ui/icons/Description';
import { GetOpenCompare, GetGroupNameToCompare } from '../../../stores/recoil/product'

interface Props {
    title: string,
    isShow: boolean,
    no: number | undefined
}

export const CardContainer: React.FC<Props> = ({ children, title, isShow, no }) => {
    const css = useStyles();
    const cssApp = useStylesTeleSale();
    const [isOpenCompare, setIsOpenCompare] = useRecoilState(GetOpenCompare);
    const [groupNameToCompare, setGroupNameToCompare] = useRecoilState(GetGroupNameToCompare);

    const handleCompare = (no: number) => {
        setGroupNameToCompare(no)
        setIsOpenCompare(true)
    }

    return (
        <Card elevation={4}>
            <CardHeader
                component={() =>
                    <div className={cssApp.cardHeader}>
                        {
                            isShow ?
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Grid item xs={8}>
                                        <Typography variant="h6">
                                            {title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button variant="contained" className={css.buttoncompare} size="small" onClick={() => { handleCompare(no as number) }}>
                                            <DescriptionIcon />เปรียบเทียบแผน
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                <Typography variant="subtitle1">
                                    {title}
                                </Typography>
                        }
                    </div>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    {children}
                </Grid>
            </CardContent>
        </Card>);
}