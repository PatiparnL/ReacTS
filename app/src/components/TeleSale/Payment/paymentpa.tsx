import {
  Grid,
  TextField,FormControl,Box,CardHeader
} from "@material-ui/core";
import React, { Fragment } from "react";
import { useStyles } from "./styles";
import {ProductQuotation } from '../../../stores/recoil/product'

interface Props {
  listProductPA: ProductQuotation[];
}
const defaultProps = {
  m: 1,
  border: 1,
  borderColor:"grey.300",
  padding: "1em" ,
  borderRadius:"borderRadius"
};
export const PaymentPA : React.FC<Props> = ({listProductPA}) => {
  const css = useStyles();
  // let productName = "ประกันอุบัติเหตุครอบครัวอุ่นใจ แผน 1";
  let L_InsurerName = "บริษัทประกัน";
  let L_InsuranceType = "ประเภทประกัน";
  let L_ProtectionDay = "วันคุ้มครอง";

  let L_TotalPremium = "เบี้ยประกันรวม";
console.log(listProductPA)
  // ประกันอุบัติเหตุครองครัวอุ่นใจ แผน 1
  // บริษัทประกัน : ซิกน่า
  // ประเภทประกัน : ประกันอุบัติเหตุ		วันคุ้มครอง : 01/10/2563 - 01/10/2564				เบี้ยประกันรวม : 2,879 บาท

  //   let productGroup= localStorage.getItem("ProductGroup");
  return ( 
    <React.Fragment>
      {listProductPA.map(pa => (
        pa.plan.map(plan=>(
          <Box  {...defaultProps} width="100%">
          <Grid container    spacing={2}>
            <Grid item xs={12}>
              {plan.producttypename} {plan.productname} :
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="tbInsurerName"
                label={L_InsurerName}
                defaultValue={plan.companyname}
                InputProps={{
                  readOnly: true,
                }}
                
              ></TextField>
            </Grid>
            <Grid item xs={4}>
            <TextField
                id="tbInsuranceType"
                label={L_InsuranceType}
                defaultValue={pa.type}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={4}>
            <TextField
                id="tbProtectionDay"
                label={L_ProtectionDay}
                defaultValue="protectionDay"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={4}>
            <TextField
                id="tbTotalPremium"
                label={L_TotalPremium}
                defaultValue={plan.premium}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
          </Box>
           ))
      ))
    }
    </React.Fragment>
  );
};
