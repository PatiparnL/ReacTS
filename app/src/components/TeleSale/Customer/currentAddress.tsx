import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import React, { useEffect, useState, createRef, memo } from 'react';

import { useStylesTeleSale } from '../styles';
import { Province, District, SubDistrict, ZipCode } from '../../../models/address';
import { addressService } from '../../../services/address';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetCurrentAddress, CustomerInfoRecoil } from '../../../stores/recoil/customer'
import { useRecoilState, useSetRecoilState } from 'recoil';

interface Props {
    title: string;
    keyData: any
}

const CurrentAddress: React.FC<Props> = ({ title, keyData }) => {
    const cssApp = useStylesTeleSale();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
    const [zipCodes, setZipCodes] = useState<ZipCode[]>([]);

    const setGetCurrentAddress = useSetRecoilState(GetCurrentAddress);

    const [address, setAddress] = useState<String>('');
    const [provinceSelected, setProvinceSelected] = useState<Province | undefined>(undefined);
    const [districtSelected, setDistrictSelected] = useState<District | undefined>(undefined);
    const [subDistrictSelected, setSubDistrictSelected] = useState<SubDistrict | undefined>(undefined);
    const [zipCodeSelected, setZipCodeSelected] = useState<ZipCode | undefined>(undefined);

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
        let obj = {
            address: address,
            provinceSelected: provinceSelected,
            districtSelected: districtSelected,
            subDistrictSelected: subDistrictSelected,
            zipCodeSelected: zipCodeSelected
        }
        console.log(obj)
        setGetCurrentAddress(obj as CustomerInfoRecoil)
    }, [zipCodeSelected])

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
                            </Grid>
                        </div>}
                />
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                key={`address-${keyData}`}
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
                                onChange={handleProvinces}
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
                                renderInput={(params) => (
                                    <TextField {...params} label="อำเภอ" variant="outlined"
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
                                onChange={handleDistrict}
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
                                onChange={handleSubDistrict}
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
                                onChange={handleZipCode}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}

export default memo(CurrentAddress)