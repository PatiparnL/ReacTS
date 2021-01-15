import React, { useState, useEffect, createRef } from 'react';
import { useStylesTeleSale } from '../styles';
import 'date-fns';
import * as _ from "lodash"

import { Card, CardContent, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, MenuItem, TextField } from '@material-ui/core';

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { leadService } from '../../../services/lead';
import { insMasterService } from '../../../services/insmaster'
import { MaritalStatus, TitleName } from '../../../models/lead'
import { OccupationGroup, OccupationByGroup } from '../../../models/insmaster'
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {

}

export const CustomerInfo: React.FC<Props> = () => {
    const cssApp = useStylesTeleSale();
    const occupatioByGroupRef = createRef<any>();

    const [listMaritalStatus, setListMaritalStatus] = useState<MaritalStatus[]>([]);
    const [listTitleName, setListTitleName] = useState<TitleName[]>([]);
    const [listOccupationGroup, setListOccupationGroup] = useState<OccupationGroup[]>([]);
    const [listOccupationByGroup, setListOccupationByGroup] = useState<OccupationByGroup[]>([]);

    const [customer, setCustomer] = useState('');

    const [id, setID] = useState(0);
    const [status, setStatus] = useState(0);
    const [birthDay, setBirthDay] = useState<Date | null>(null);
    const [age, setAge] = useState(0);
    const [titleName, setTitleName] = useState({});
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [occupatio, setOccupatio] = useState({});
    const [occupatioByGroup, setOccupatioByGroup] = useState({});
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [homePhone, setHomePhone] = useState(0);

    const [regisDate, setRegisDate] = useState<Date | null>(null);
    const [issueDate, setIssueDate] = useState<Date | null>(null);
    const [corporationName, setCorporationName] = useState('');

    useEffect(() => {
        const GetMaritalStatus = async () => {
            let reponse = await leadService.GetMaritalStatus()
            setListMaritalStatus(reponse.data)
        }
        const GetTitleName = async () => {
            let reponse = await leadService.GetTitleName()
            setListTitleName(reponse.data)
        }
        const GetOccupationGroup = async () => {
            let reponse = await insMasterService.GetOccupationGroup()
            setListOccupationGroup(reponse.data)
        }
        GetMaritalStatus()
        GetTitleName()
        GetOccupationGroup()
    }, []);

    useEffect(() => {
        let obj = {
            id: id,
            status: status,
            birthDay: birthDay,
            age: age,
            titleName: titleName,
            name: name,
            lastname: lastname,
            gender: gender,
            occupatio: occupatio,
            occupatioByGroup: occupatioByGroup,
            email: email,
            phone: phone,
            homePhone: homePhone,
            regisDate: regisDate,
            issueDate: issueDate,
            corporationName: corporationName
        }
    }, [id, status, birthDay, age, titleName, name, lastname, gender, occupatio, occupatioByGroup, email
        , phone, homePhone, regisDate, issueDate, corporationName])

    const GetOccupationByGroup = async (groupid: string) => {
        let reponse = await insMasterService.GetOccupationByGroup(groupid)
        if (!reponse.data.error) setListOccupationByGroup(reponse.data)
    }

    const handleSelectCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender('')
        setCustomer((event.target as HTMLInputElement).value);
    };

    const handleID = (event: any) => { setID(event.target.value) }
    const handleMaritalStatus = (event: any) => { setStatus(event.target.value) };
    const handleBirthDay = (date: Date | null) => {
        setBirthDay(date);
        if (date) setAge((new Date().getFullYear() - date?.getFullYear()) + 1)
    };
    const handleTitleName = (event: any, value: any) => { setTitleName(value); setGender(value ? value.genderthai : '') }
    const handleName = (event: any) => { setName(event.target.value) }
    const handleLastname = (event: any) => { setLastName(event.target.value) }
    const handleOccupation = (event: any, value: any) => {
        setOccupatio(value)
        occupatioByGroupRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        if (value) GetOccupationByGroup(value.sOccupationGroupID)
    }
    const handleOccupationByGroup = (event: any, value: any) => {
        setOccupatioByGroup(value)
    }
    const handleEmail = (event: any) => { setEmail(event.target.value) }
    const handlePhone = (event: any) => { setPhone(event.target.value) }
    const handleHomePhone = (event: any) => { setHomePhone(event.target.value) }

    const handleRegisDate = (date: Date | null) => { setRegisDate(date); };
    const handleIssueDate = (date: Date | null) => { setIssueDate(date); };
    const handleCorporationName = (event: any) => { setCorporationName(event.target.value) }

    const RenderPerson = () => {
        return (<React.Fragment>
            <Grid item sm={4} xs={12}>
                <TextField
                    key="ID"
                    type="number"
                    size="small"
                    variant="outlined"
                    label="หมายเลขบัตรประชาชน"
                    onBlur={handleID}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <FormControl
                    fullWidth
                    size="small"
                    variant="outlined">
                    <InputLabel>สถานะ</InputLabel>
                    <Select
                        key="MaritalStatus"
                        label="สถานะ"
                        onChange={handleMaritalStatus}
                    >
                        {
                            listMaritalStatus?.map(m => (<MenuItem value={m.maritalstatusid}>{m.maritalstatusname}</MenuItem>))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={4} xs={12}>
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
            <Grid item sm={4} xs={12}>
                <TextField
                    key="age"
                    type="number"
                    size="small"
                    variant="outlined"
                    label="อายุ"
                    value={age}
                    fullWidth
                    placeholder="เลือกวันเกิด"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Autocomplete
                    key="titlename"
                    options={listTitleName as TitleName[]}
                    getOptionLabel={(option) => option.titledescription}
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
            <Grid item sm={4} xs={12}>
                <TextField
                    key="name"
                    size="small"
                    variant="outlined"
                    label="ชื่อ"
                    onBlur={handleName}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    key="lastname"
                    size="small"
                    variant="outlined"
                    label="นามสกุล"
                    onBlur={handleLastname}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    key="gender"
                    size="small"
                    variant="outlined"
                    label="เพศ"
                    value={gender}
                    fullWidth
                    placeholder="เลือกคำนำหน้าชื่อ"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Autocomplete
                    key="occupationGroup"
                    options={listOccupationGroup as OccupationGroup[]}
                    getOptionLabel={(option) => option.sOccupationGroupName}
                    renderInput={(params) => (
                        <TextField {...params} label="กลุ่มธุรกิจ" variant="outlined"
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
                    onChange={handleOccupation}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Autocomplete
                    key="occupationByGroup"
                    ref={occupatioByGroupRef}
                    options={listOccupationByGroup as OccupationByGroup[]}
                    getOptionLabel={(option) => option.sOccupationNameTH}
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
                    onChange={handleOccupationByGroup}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    key="email"
                    size="small"
                    variant="outlined"
                    label="E-Mail"
                    onBlur={handleEmail}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    label="เบอร์โทรศัพท์"
                    key="phone"
                    onBlur={handlePhone}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    label="โทรศัพท์บ้าน"
                    key="homePhone"
                    onBlur={handleHomePhone}
                    fullWidth
                />
            </Grid>
        </React.Fragment>)
    }

    const RenderCorporation = () => {
        return (<React.Fragment>
            <Grid item sm={4} xs={12}>
                <TextField
                    type="number"
                    size="small"
                    variant="outlined"
                    label="หมายเลขบัตรประชาชน"
                    key="ID2"
                    onBlur={handleID}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style={{ marginTop: '-16px', marginBottom: '-8px' }}>
                        <KeyboardDatePicker
                            margin="normal"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            id="regisDate"
                            key="regisDate"
                            label="วันจดทะเบียน"
                            value={regisDate}
                            onChange={handleRegisDate}
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
            <Grid item sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style={{ marginTop: '-16px', marginBottom: '-8px' }}>
                        <KeyboardDatePicker
                            margin="normal"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            id="issueDate"
                            key="issueDate"
                            label="วันออกหนังสือ"
                            value={issueDate}
                            onChange={handleIssueDate}
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
            <Grid item sm={4} xs={12}>
                <Autocomplete
                    key="titlename"
                    options={listTitleName as TitleName[]}
                    getOptionLabel={(option) => option.titledescription}
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
            <Grid item sm={4} xs={12}>
                <TextField
                    key="corporationName"
                    size="small"
                    variant="outlined"
                    label="ชื่อนิติบุคคล"
                    onBlur={handleCorporationName}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    key="email"
                    size="small"
                    variant="outlined"
                    label="E-Mail"
                    onBlur={handleEmail}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    size="small"
                    variant="outlined"
                    label="เบอร์โทรศัพท์"
                    key="phone"
                    onBlur={handlePhone}
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} xs={12}>
                <TextField
                    size="small"
                    variant="outlined"
                    label="โทรศัพท์บ้าน"
                    key="homePhone"
                    onBlur={handleHomePhone}
                    fullWidth
                />
            </Grid>
        </React.Fragment>)
    }

    const RenderSwitch = (param: any) => {
        switch (param) {
            case '0':
                return RenderCorporation();
            case '1':
                return RenderPerson();
            default:
                return null;
        }
    }

    return <Grid container spacing={2} >
        <Grid item xs={12}>
            <Card style={{ marginTop: '1em' }}>
                <CardHeader
                    title="ข้อมูลลูกค้า"
                    titleTypographyProps={{ variant: "h6" }}
                    className={cssApp.cardHeader} />
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <RadioGroup row aria-label="customer" name="customer" defaultValue="top" onChange={handleSelectCustomer}>
                                <FormControlLabel
                                    value="0"
                                    control={<Radio color="secondary" />} label="นิติบุคคล" />
                                <FormControlLabel
                                    value="1"
                                    control={<Radio color="secondary" />} label="บุคคลธรรมดา" />
                            </RadioGroup>
                        </Grid>
                        {
                            RenderSwitch(customer)
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}