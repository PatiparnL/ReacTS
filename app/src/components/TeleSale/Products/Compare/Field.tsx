import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { CardContainer } from "../../../UI";
import {
    Grid,
    TextField,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment
} from "@material-ui/core";
import {
    ListProductQuotation,
    GetGroupNameToCompare
} from '../../../../stores/recoil/product'

export const CompareField = () => {
    const [productGroup, setProductGroup] = useState('');

    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
    const [groupNameToCompare, setGroupNameToCompare] = useRecoilState(GetGroupNameToCompare);

    useEffect(() => {
        let product = listProductQuotation.filter(f => f.no == groupNameToCompare)
        setProductGroup(product[0].name as string)
    }, [listProductQuotation, groupNameToCompare])

    return (
        <React.Fragment>
            <CardContainer title="ข้อมูลใบเสนอราคา" isShow={false} no={undefined}>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <FormHelperText id="standard-weight-helper-text">ประเภท</FormHelperText>
                        <Input
                            id="standard-adornment-weight"
                            value={productGroup}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <FormHelperText id="standard-weight-helper-text">ชื่อลูกค้า</FormHelperText>
                        <Input
                            id="standard-adornment-weight"
                            value={"นาย ปปปปปปป ยยยยย"}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <FormHelperText id="standard-weight-helper-text">เบอร์ติดต่อ</FormHelperText>
                        <Input
                            id="standard-adornment-weight"
                            value={"0900000000"}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <FormHelperText id="standard-weight-helper-text">อายุ</FormHelperText>
                        <Input
                            id="standard-adornment-weight"
                            value={18}
                            endAdornment={<InputAdornment position="end">ปี</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
            </CardContainer>
        </React.Fragment>
    )
}