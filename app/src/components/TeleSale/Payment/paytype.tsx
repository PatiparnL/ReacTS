import React, { useEffect, useState } from "react";
// import { useRecoilState, useSetRecoilState } from 'recoil';
// import { ListPayType } from "../../../stores/recoil/payment";
// import { paymentService } from '../../../services/payment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ListPayType, iPayType } from "../../../stores/recoil/payment";
import { Grid, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from "./styles";

interface Props {
  payTypeSelected: string;
  setPayTypeSelected: any;
}

export const PayType: React.FC<Props> = ({ payTypeSelected, setPayTypeSelected }) => {
  const css = useStyles();
  let L_PayType = "เลือกวิธีการชำระ";
  const valuePayType = useRecoilValue(ListPayType);
  const [listDdlPayType, setListDdlPayType] = useState<iPayType[]>([]);
  const onChangePayType = (event: any, value: any) => {
    setPayTypeSelected(value != null ? value.paytypecode : "")
  }
  // const onBlurPayType = ((newValue: any) => {
  //   let value = newValue.target.value;
  //   console.log(newValue.target)
  //   setPayTypeSelected(value)
  //   // setDdlPayType(value);
  // });

  useEffect(() => {
    if (valuePayType.length > 0) {
      setListDdlPayType([...valuePayType].sort((a, b) => (a.paytypekey > b.paytypekey ? 1 : -1)))
    }
  }, [valuePayType]);

  return (
    <React.Fragment>
      <Grid container spacing={2} >
        <Grid item xs={8} md={6} lg={4}>
          {/* <InputLabel id="ddlPayType-label" className={css.scaleLabel}>
            {L_PayType}
          </InputLabel> */}
          <Autocomplete
            onChange={onChangePayType}
            id="paytypename"
            options={listDdlPayType}
            getOptionLabel={(option) => option.paytypedesc}
            renderInput={(params) => (
              <TextField {...params} label={L_PayType} variant="outlined"
                InputLabelProps={{
                  classes: {
                    outlined: css.labeloutlined
                  }
                }}
              />
            )}
            classes={{
              input: css.autocompleteinput,
              popupIndicator: css.popupIndicator
            }}
            fullWidth
          />
          {/* <Select
            labelId="ddlPayType-label"
            id="ddlPayType"
            value={payTypeSelected}
            onBlur={onBlurPayType}
            fullWidth
          >
            {
              listDdlpayType.length > 0 ?
                listDdlpayType
                  .map((data, i) => (
                    <MenuItem key={i} value={data.paytypecode}>
                      {data.paytypedesc}
                    </MenuItem>
                  ))
                : null
            }
          </Select> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
