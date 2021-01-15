import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControlLabel
} from '@material-ui/core'
import React, { useEffect, useState, createRef, memo } from 'react';

import { useStylesTeleSale } from '../styles';
import { Province, District, SubDistrict, ZipCode } from '../../../models/address';
import { addressService } from '../../../services/address';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetCurrentAddress, GetDocumentAddress, CustomerInfoRecoil } from '../../../stores/recoil/customer'
import { useRecoilState, useRecoilValue } from 'recoil';

interface Props {
    title: string;
    keyData: any;
    getCurrentAddress: CustomerInfoRecoil | null
}

const DocumentAddress: React.FC<Props> = ({ title, keyData, getCurrentAddress }) => {
    const cssApp = useStylesTeleSale();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
    const [zipCodes, setZipCodes] = useState<ZipCode[]>([]);
    const [checkedAddress, setCheckedAddress] = useState(false);

    const [getDocumentAddress, setGetDocumentAddress] = useRecoilState(GetDocumentAddress);

    const [address, setAddress] = useState('');
    const [provinceSelected, setProvinceSelected] = useState<Province | undefined>(undefined);
    const [inputValueProvinceSelected, setInputValueProvinceSelected] = useState('');

    const [districtSelected, setDistrictSelected] = useState<District | undefined>(undefined);
    const [inputValueDistrictSelected, setInputValueDistrictSelected] = useState('');

    const [subDistrictSelected, setSubDistrictSelected] = useState<SubDistrict | undefined>(undefined);
    const [inputValueSubDistrictSelected, setInputValueSubDistrictSelected] = useState('');

    const [zipCodeSelected, setZipCodeSelected] = useState<ZipCode | undefined>(undefined);
    const [inputValueZipCodeSelected, setInputValueZipCodeSelected] = useState('');

    const districtsRef = createRef<any>();
    const subDistrictRef = createRef<any>();
    const zipCodesRef = createRef<any>();

    useEffect(() => {
        addressService.GetProvince().then(res => {
            setProvinces(res);
            setDistricts([])
        })
    }, []);

    useEffect(() => {
        if (checkedAddress && getCurrentAddress != undefined) {
            setAddress(getCurrentAddress?.address as string)

            setProvinceSelected(getCurrentAddress?.provinceSelected)
            setInputValueProvinceSelected(getCurrentAddress?.provinceSelected?.provincenameth as string)
            getDistrict(getCurrentAddress?.provinceSelected?.provincekey as number);

            setDistrictSelected(getCurrentAddress?.districtSelected)
            setInputValueDistrictSelected(getCurrentAddress?.districtSelected?.districtnameth as string)

            setSubDistrictSelected(getCurrentAddress?.subDistrictSelected)
            setInputValueSubDistrictSelected(getCurrentAddress?.subDistrictSelected?.subdistrictnameth as string)

            setZipCodeSelected(getCurrentAddress?.zipCodeSelected)
            setInputValueZipCodeSelected(getCurrentAddress?.zipCodeSelected?.zipcode as string)
        }
        else {
            SetGetDocumentAddress('', undefined, undefined, undefined, undefined)

            setAddress('')
            setProvinceSelected({} as Province)
            setInputValueProvinceSelected('')

            setDistricts([])
            setDistrictSelected({} as District)
            setInputValueDistrictSelected('')

            setSubDistrictSelected({} as SubDistrict)
            setInputValueSubDistrictSelected('')

            setZipCodeSelected({} as ZipCode)
            setInputValueZipCodeSelected('')
        }
    }, [checkedAddress, getCurrentAddress]);

    useEffect(() => {
        SetGetDocumentAddress(address, provinceSelected, districtSelected, subDistrictSelected, zipCodeSelected)
    }, [zipCodeSelected])

    const SetGetDocumentAddress = (
        address: string,
        provinceSelected: Province | undefined,
        districtSelected: District | undefined,
        subDistrictSelected: SubDistrict | undefined,
        zipCodeSelected: ZipCode | undefined
    ) => {
        let obj = {
            address: address,
            provinceSelected: provinceSelected,
            districtSelected: districtSelected,
            subDistrictSelected: subDistrictSelected,
            zipCodeSelected: zipCodeSelected
        }
        setGetDocumentAddress(obj as CustomerInfoRecoil)
    }

    const getDistrict = (provinceId: number) => {
        addressService.GetDistrict(provinceId).then(res => {
            setDistricts(res);
        })
    }
    const getSubDistrict = (districtId: number) => {
        addressService.GetSubDistrict(districtId).then(res => {
            setSubDistricts(res);
        })
    }
    const getZipCode = (subDistrictId: number) => {
        addressService.GetZipCode(subDistrictId).then(res => {
            setZipCodes(res);
        })
    }

    const handleAddress = (event: any) => { setAddress(event.target.value) }
    const handleCheckedAddress = (event: any) => { setCheckedAddress(event.target.checked) };

    const handleProvinces = (event: any, value: any) => {
        subDistrictRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        zipCodesRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        districtsRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        if (value) {
            setProvinceSelected(value)
            getDistrict(value?.provincekey);
        }
        else {
            setProvinceSelected({} as Province)
            setDistricts([])
        }
    }
    const handleDistrict = (event: any, value: any) => {
        zipCodesRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        subDistrictRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        if (value) {
            setDistrictSelected(value)
            getSubDistrict(value?.districtkey);
        }
        else {
            setDistrictSelected({} as District)
            setSubDistricts([])
        }
    }
    const handleSubDistrict = (event: any, value: any) => {
        zipCodesRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
        if (value) {
            setSubDistrictSelected(value);
            getZipCode(value?.subdistrictkey)
        }
        else {
            setSubDistrictSelected({} as SubDistrict)
            setZipCodes([])
        }
    }
    const handleZipCode = (event: any, value: any) => {
        if (value) {
            setZipCodeSelected(value)
        }
        else {
            setZipCodeSelected({} as ZipCode)
        }
    }

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Card style={{ marginTop: 20 }}>
                <CardHeader
                    component={() =>
                        <div className={cssApp.cardHeader}>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item xs>
                                    <Typography variant="h6">
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        style={{ float: 'right' }}
                                        control={
                                            <Checkbox
                                                checked={checkedAddress}
                                                onChange={handleCheckedAddress}
                                                name="checkedAddress"
                                                color="primary"
                                            />
                                        }
                                        label="ที่อยู่ปัจจุปัน"
                                    />
                                </Grid>
                            </Grid>
                        </div>}
                />
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="บ้านเลขที่/ซอย/หมู่บ้าน"
                                value={address}
                                onChange={handleAddress}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                id="provinces"
                                value={provinceSelected}
                                key={`provinces-${keyData}`}
                                options={provinces as Province[]}
                                getOptionLabel={(option) => option.provincenameth}
                                onChange={handleProvinces}
                                inputValue={inputValueProvinceSelected}
                                onInputChange={(event, newInputValue) => {
                                    setInputValueProvinceSelected(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="จังหวัด" variant="outlined"
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
                        <Grid item xs={3}>
                            <Autocomplete
                                id="districts"
                                key={`districts-${keyData}`}
                                ref={districtsRef}
                                value={districtSelected}
                                options={districts as District[]}
                                getOptionLabel={(option: District) => option.districtnameth}
                                onChange={handleDistrict}
                                inputValue={inputValueDistrictSelected}
                                onInputChange={(event, newInputValue) => {
                                    setInputValueDistrictSelected(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="จังหวัด" variant="outlined"
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
                        <Grid item xs={3}>
                            <Autocomplete
                                id="subDistrict"
                                key={`subDistrict-${keyData}`}
                                ref={subDistrictRef}
                                value={subDistrictSelected}
                                options={subDistricts as SubDistrict[]}
                                getOptionLabel={(option) => option.subdistrictnameth}
                                onChange={handleSubDistrict}
                                inputValue={inputValueSubDistrictSelected}
                                onInputChange={(event, newInputValue) => {
                                    setInputValueSubDistrictSelected(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="ตำบล" variant="outlined"
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
                        <Grid item xs={3}>
                            <Autocomplete
                                id="zipCode"
                                key={`zipCode-${keyData}`}
                                ref={zipCodesRef}
                                value={zipCodeSelected}
                                options={zipCodes as ZipCode[]}
                                getOptionLabel={(option) => option.zipcode}
                                onChange={handleZipCode}
                                inputValue={inputValueZipCodeSelected}
                                onInputChange={(event, newInputValue) => {
                                    setInputValueZipCodeSelected(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="รหัสไปรณีย์" variant="outlined"
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
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}

export default DocumentAddress