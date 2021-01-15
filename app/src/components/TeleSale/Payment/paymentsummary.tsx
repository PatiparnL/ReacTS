import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  Box
} from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  payTypeSelected: string;
  countProduct: number;
  totalPreminum: string;
}


export const PaymentSummary: React.FC<Props> = ({ payTypeSelected, countProduct, totalPreminum }) => {
  const classes = useStyles();
  let L_CountList = "จำนวนรายการ";
  let L_Total = "สรุปยอดรวม";
  let L_Term = "จำนวนงวดที่ผ่อน";
  let L_Installment = "จำนวนผ่อนต่องวด";
  const hiddenSummary = payTypeSelected != "CL" ? true : false;
  const [tbCountProduct, setTbCountProduct] = useState("")
  const [tbTotalPremium, setTbTotalPremium] = useState("")

  useEffect(() => {
    setTbCountProduct(countProduct + " รายการ")
  }, [countProduct])

  useEffect(() => {
    setTbTotalPremium(totalPreminum + " บาท")
  }, [totalPreminum])

  return (
    <React.Fragment>
      <Grid container spacing={2} >
        <Grid item xs={4}>
          <TextField
            id="tbCountList"
            label={L_CountList}
            value={tbCountProduct}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <TextField
                id="tbTotal"
                label={L_Total}
                value={tbTotalPremium}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} hidden={hiddenSummary}>
              <TextField
                id="tbTerm"
                label={L_Term}
                defaultValue="term"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} hidden={hiddenSummary}>
              <TextField
                id="tbInstallment"
                label={L_Installment}
                defaultValue="installment"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
