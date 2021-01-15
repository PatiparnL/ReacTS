import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useStylesTeleSale } from '../../styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';

const top100Films = [
    { title: 'นาย', value: 1 },
    { title: 'นางสาว', value: 2 },
];

export const Beneficiary = () => {
    const cssApp = useStylesTeleSale();

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
                        <Typography>ผู้รับผลประโยชน์</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} style={{ marginTop: '0.5em' }}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    ผู้รับผลประโยชน์ (สูงสุด 3 คน)
                                </Typography>
                            </Grid>
                            <Grid item sm={2} xs={6}>
                                <Typography variant="subtitle1">
                                    ลำดับที่ 1
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <Autocomplete
                                    id="statusNo1"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="ความสัมพันธ์" variant="outlined"
                                            InputLabelProps={{
                                                classes: {
                                                    outlined: cssApp.labeloutlined
                                                }
                                            }}
                                        />
                                    )}
                                    classes={{
                                        input: cssApp.autocompleteinput,
                                        popupIndicator: cssApp.popupIndicator,
                                        endAdornment: cssApp.endAdornment
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='nameNo1'
                                    label='ชื่อ'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='lastnameNo1'
                                    label='นามสกุล'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={2} xs={6}>
                                <Typography variant="subtitle1">
                                    ลำดับที่ 2
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <Autocomplete
                                    id="statusNo2"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="ความสัมพันธ์" variant="outlined"
                                            InputLabelProps={{
                                                classes: {
                                                    outlined: cssApp.labeloutlined
                                                }
                                            }}
                                        />
                                    )}
                                    classes={{
                                        input: cssApp.autocompleteinput,
                                        popupIndicator: cssApp.popupIndicator,
                                        endAdornment: cssApp.endAdornment
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='nameNo2'
                                    label='ชื่อ'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='lastnameNo2'
                                    label='นามสกุล'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={2} xs={6}>
                                <Typography variant="subtitle1">
                                    ลำดับที่ 3
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={6}>
                                <Autocomplete
                                    id="statusNo3"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="ความสัมพันธ์" variant="outlined"
                                            InputLabelProps={{
                                                classes: {
                                                    outlined: cssApp.labeloutlined
                                                }
                                            }}
                                        />
                                    )}
                                    classes={{
                                        input: cssApp.autocompleteinput,
                                        popupIndicator: cssApp.popupIndicator,
                                        endAdornment: cssApp.endAdornment
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='nameNo3'
                                    label='ชื่อ'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={3} xs={6}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    name='lastnameNo3'
                                    label='นามสกุล'
                                    fullWidth
                                />
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