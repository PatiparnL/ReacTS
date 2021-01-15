import React, { useEffect, useState, memo } from 'react';
import { useStylesTeleSale } from '../../styles';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    FormControlLabel,
    Typography,
    TextField,
    Radio,
    RadioGroup
} from '@material-ui/core';

const Insurance = () => {
    const cssApp = useStylesTeleSale();

    const [customer, setCustomer] = useState('');

    const handleSendInsurance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer((event.target as HTMLInputElement).value);
    };

    return (
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
                        <Typography>การจัดส่งกรมธรรม์</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} style={{ marginTop: '0.5em' }}>
                            <Grid item xs={12}>
                                <RadioGroup row aria-label="customer" name="customer" defaultValue="top" onChange={handleSendInsurance}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            value="0"
                                            control={<Radio color="secondary" />} label="ส่งทางไปรษณีย์" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            value="1"
                                            control={<Radio color="secondary" />} label={
                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    key='email'
                                                    label='ส่งทาง E-mail'
                                                    fullWidth
                                                />
                                            } />
                                    </Grid>
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme: Theme) => ({

}));

export default memo(Insurance)