import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStylesTeleSale } from '../../styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Typography,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const Coverage = () => {
    const cssApp = useStylesTeleSale();

    const [CoverageStartDate, setCoverageStartDate] = useState<Date | null>(new Date());
    const [CoverageEndDate, setCoverageEndDate] = useState<Date | null>(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

    const handleCoverageStartDate = (date: Date | null) => {
        const year = date?.getFullYear() as number
        const month = date?.getMonth() as number
        const day = date?.getDate()

        var endDate = new Date(year + 1, month, day)
        setCoverageStartDate(date);
        setCoverageEndDate(endDate)
    };
    const handleCoverageEndDate = (date: Date | null) => {
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            classes={{
                                content: cssApp.marginAccordion,
                                root: cssApp.paddingAccordion + ' ' + cssApp.cardHeader,
                                expandIcon: cssApp.expandIconAccordion
                            }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>ข้อมูลความคุ้มครอง</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} style={{ marginTop: '0.5em' }}>
                                <Grid item sm={6} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around" style={{ marginTop: '-16px', marginBottom: '-8px' }}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="coverageStart"
                                                label="วันที่เริ่มคุ้มครอง"
                                                value={CoverageStartDate}
                                                onChange={handleCoverageStartDate}
                                                minDate={new Date()}
                                                size="small"
                                                fullWidth
                                                autoOk
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    size: 'small'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="coverageEnd"
                                                label="วันที่สิ้นสุดคุ้มครอง"
                                                value={CoverageEndDate}
                                                onChange={handleCoverageEndDate}
                                                size="small"
                                                fullWidth
                                                disabled
                                                readOnly
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    size: 'small'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}


const useStyles = makeStyles((theme: Theme) => ({

}));