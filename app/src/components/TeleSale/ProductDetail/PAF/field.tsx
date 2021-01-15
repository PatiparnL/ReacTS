import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    TextField,
    Typography,
    Hidden
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { useStylesTeleSale } from '../../styles';
import MaskedInput from 'react-text-mask';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Beneficiary } from './beneficiary'
import DetailChild from './detailChild'

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

interface Prop {
    title: string
    nameObj: string
    changedValue?: (name: string, value: any) => void;
}

const top100Films = [
    { title: 'นาย', value: 1 },
    { title: 'นางสาว', value: 2 },
];

export const Field: React.FC<Prop> = ({ title, nameObj, changedValue }) => {
    const cssApp = useStylesTeleSale();
    const css = useStyles();

    const [titlename, setTitleName] = useState({});
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [birthDay, setBirthDay] = useState<Date | null>(null);
    const [citizenID, setCitizenID] = useState('');
    const [career, setCareer] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        let obj = {
            titlename: titlename,
            name: name,
            lastname: lastname,
            birthDay: birthDay,
            citizenID: citizenID,
            career: career,
            phone: phone
        }
        if (changedValue) changedValue(nameObj, obj)
    }, [titlename, name, lastname, birthDay, citizenID, career, phone])

    const handleTitleName = (event: any, value: any) => { setTitleName(value) }
    const handleName = (event: any) => { setName(event.target.value) }
    const handleLastName = (event: any) => { setLastName(event.target.value) }
    const handleBirthDay = (date: Date | null) => { setBirthDay(date); };
    const handleCitizenID = (event: any) => { setCitizenID(event.target.value); };
    const handleCareer = (event: any, value: any) => { setCareer(value) }
    const handlePhone = (event: any) => { setPhone(event.target.value); };

    const RenderDetail = () => {
        return (<React.Fragment>
            <Grid item sm={6} xs={12}>
                <Autocomplete
                    id="titlename"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="คำนำหน้าชื่อ" variant="outlined"
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
                    onChange={handleTitleName}
                    fullWidth
                />
            </Grid>
            <Hidden xsDown>
                <Grid item xs>
                </Grid>
            </Hidden>
            <Grid item sm={6} xs={12}>
                <TextField
                    size="small"
                    variant="outlined"
                    name='name'
                    label='ชื่อ'
                    onBlur={handleName}
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    type="string"
                    size="small"
                    variant="outlined"
                    name='lastname'
                    label='นามสกุล'
                    onBlur={handleLastName}
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style={{ marginTop: '-16px', marginBottom: '-8px' }}>
                        <KeyboardDatePicker
                            margin="normal"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            id="birthday"
                            key="birthday"
                            label="วันเกิด"
                            value={birthDay}
                            onChange={handleBirthDay}
                            size="small"
                            autoOk
                            fullWidth
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                                size: 'small'
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={6} xs={12}>
                {/* <MaskedInput
                    mask={[/[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/]}
                    className={css.textmask}
                    placeholder='รหัสประชาชน'
                    id='citizenID'
                    type='text'
                /> */}
                <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name='citizenID'
                    label='รหัสประชาชน'
                    onBlur={handleCitizenID}
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <Autocomplete
                    id="career"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="อาชีพ" variant="outlined"
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
                    onChange={handleCareer}
                    fullWidth
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    name='phone'
                    label='เบอร์โทรศัพท์'
                    onBlur={handlePhone}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Beneficiary />
            </Grid>
        </React.Fragment>)
    }

    const RenderDetailChild = (title: string) => {
        return (<React.Fragment>
            <DetailChild title={title}/>
        </React.Fragment>)
    }

    const RenderSwitch = (title: string) => {
        switch (title) {
            case 'ข้อมูลบุตร':
                return RenderDetailChild(title);
            default:
                return RenderDetail();
        }
    }

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
                            <Typography>{title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2} style={{ marginTop: '0.5em' }}>
                                {
                                    RenderSwitch(title)
                                }
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    paddingAccordion: {
        padding: '0px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    marginAccordion: {
        margin: '0px'
    },
    expandIconAccordion: {
        marginRight: '0px',
        padding: '0px'
    },
    textmask: {
        paddingLeft: '10px',
        width: '100%',
        fontSize: '17px',
        height: '41px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
    }
}));