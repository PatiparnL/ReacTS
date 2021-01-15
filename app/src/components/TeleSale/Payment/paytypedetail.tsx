import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ListCreditCardType, iCreditCardType } from "../../../stores/recoil/payment";

import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl

} from "@material-ui/core";
import { useStyles } from "./styles";
import { FileObject } from "material-ui-dropzone";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UploadFile } from "../../UI";
import { GridEmptySpace } from "../../UI/GridEmptySpace";

interface Props {
  payTypeSelected: string;
}

export const PayTypeDetail: React.FC<Props> = ({ payTypeSelected }) => {
  const css = useStyles();

  let listTerm = [
    { text: "6 เดือน", value: "6", order: 1 },
    { text: "10 เดือน", value: "10", order: 2 },
    { text: "12 เดือน", value: "12", order: 3 },
  ];
  let L_CreditCardType = "ประเภทบัตรเครดิต";
  let L_CreditCardID = "เลขที่บัตรเครดิต";
  let L_UploadDocCreditCard = "เอกสารยินยอมให้ตัดบัตรเครดิต *";
  let L_UploadDocCredit = "เอกสารอนุมัติสินเชื่อ *";
  let L_EmpID = "รหัสพนักงาน";
  let L_EmpName = "ชื่อพนักงาน";
  let L_SalaryDeductionDate = "เดือน/ปี ที่หักเงินเดือน"
  let L_Term = "เลือกจำนวน งวด"

  const valueCreditCardType = useRecoilValue(ListCreditCardType);
  const [listAllCreditCardType, setListAllCreditCardType] = useState<iCreditCardType[]>([]);
  const [listDdlCreditCardType, setListDdlCreditCardType] = useState<iCreditCardType[]>([]);
  const [isInstallment, setIsInstallment] = useState("true");
  const [tbCreditCardType, setTbCreditCardType] = useState("");

  const [creditCardID, setCreditCardID] = useState("");
  const [empID, setEmpID] = useState("");
  const [empName, setEmpName] = useState("");
  const [salaryDeductionDate, setSalaryDeductionDate] = useState("12/2563	01/2564");
  const [ddlterm, setDdlTerm] = useState("6");

  const stepInput = React.createRef<any>();

  const onBlurTerm = ((newValue: any) => {
    let value = newValue.target.value;
    console.log(value)
    setDdlTerm(value);
  });

  const onChangeIsInstallment = ((newValue: any) => {
    let value = newValue.target.value;
    setIsInstallment(value);
    stepInput.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
  });

  const onChangeCreditCardType = (event: any, value: any) => {
    // setTbCreditCardType(value.creditcardtypename)
    console.log('onChangeCreditCardType', value)
  }

  const setDdlCreditCardByIsInstallment = () => {
    let isInstall = isInstallment == "true" ? true : false;
    setListDdlCreditCardType(listAllCreditCardType.filter(data => data.isinstallment === isInstall))
    console.log("setDdlCreditCardByIsInstallment")
  }

  useEffect(() => {
    if (payTypeSelected == "CC") {
      if (valueCreditCardType.length > 0) {
        let creditCardSort = [...valueCreditCardType].sort((a, b) => (a.creditcardtypecode > b.creditcardtypecode ? 1 : -1));
        setListAllCreditCardType(creditCardSort)
        console.log("useEffect valueCreditCardType")
      }
    }
  }, [payTypeSelected]);

  useEffect(() => {
    if (payTypeSelected == "CC") {
      setDdlCreditCardByIsInstallment()
      console.log("useEffect payTypeSelected")
    }
  }, [listAllCreditCardType]);

  useEffect(() => {
    setDdlCreditCardByIsInstallment();
    console.log("useEffect isInstallment");
    setTbCreditCardType("")
  }, [isInstallment]);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
       
      >
        <Grid item xs={12} hidden={payTypeSelected != "CC"}>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}  >
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top" value={isInstallment} onChange={onChangeIsInstallment}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="secondary" />} label="ผ่อนชำระ" />
                  <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />} label="ไม่ผ่อนชำระ" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              {/* <InputLabel id="ddlCreditCardType-label" className={css.scaleLabel}>
                {L_CreditCardType}
              </InputLabel> */}
              <Autocomplete
                ref={stepInput}
                id="creditCardTypeName"
                onChange={onChangeCreditCardType}
                options={listDdlCreditCardType}
                getOptionLabel={(option) => option.creditcardtypename}
                renderInput={(params) => (
                  <TextField {...params} label={L_CreditCardType}
                    variant="outlined"
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
                labelId="ddlCreditCardType-label"
                id="ddlCreditCardType"
                value={creditCardType}
                onBlur={onBlurCreditCardType}
                fullWidth
              >
                {listDdlCreditCardType
                  .map((data, i) => (
                    <MenuItem key={i} value={data.creditcardtypename}>
                      {data.creditcardtypename}
                    </MenuItem>
                  ))}
              </Select> */}
            </Grid>
            <Grid item xs={4} md={6} lg={8} />
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                id="tbCreditCardID"
                label={L_CreditCardID}
                defaultValue={creditCardID}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <UploadFile
                label={L_UploadDocCreditCard}
                xs={12}
                sm={12}
                selectedFile={(value: FileObject | undefined) => { }}
              />
            </Grid>

            {/* ประเภทการชำระ	 ผ่อนชำระ	ไม่ผ่อนชำระ		
              ประเภทบัตรเครดิต	DropDown			
              เลขที่บัตรเครดิต	DropDown			
              เอกสารยินยอมให้ตัดบัตรเครดิต *	File Upload			 */}
          </Grid>
        </Grid>
        <Grid item xs={12} hidden={payTypeSelected != "CS"}>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={6} md={4} >
              <TextField
                id="tbEmpID"
                label={L_EmpID}
                defaultValue={empID}
                fullWidth
              ></TextField>
              {/* รหัสพนักงาน	EmpID		ชื่อพนักงาน 	Text Auto Show When Input EmpID		
              เดือน/ปี ที่หักเงินเดือน	12/2563	01/2564	note ** เดือนสุดท้ายขอปี , เดือนแรกของปีหน้า			 */}
            </Grid>
            <GridEmptySpace xs="hidden" md={4} >
              <TextField
                id="tbEmpName"
                label={L_EmpName}
                defaultValue={empName}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>

            </GridEmptySpace>
            <Grid item xs={false} md={4} ></Grid>
            <Grid item xs={8} md={4}  >
              <TextField
                id="tbSalaryDeductionDate"
                label={L_SalaryDeductionDate}
                defaultValue={salaryDeductionDate}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              ></TextField>
            </Grid>
            {/* รหัสพนักงาน	EmpID		ชื่อพนักงาน 	Text Auto Show When Input EmpID		
              เดือน/ปี ที่หักเงินเดือน	12/2563	01/2564	note ** เดือนสุดท้ายขอปี , เดือนแรกของปีหน้า			 */}
          </Grid>
        </Grid>
        <Grid item xs={12} hidden={payTypeSelected != "CV"}>
          <UploadFile
            label={L_UploadDocCredit}
            xs={12}
            sm={12}
            selectedFile={(value: FileObject | undefined) => { }}
          />
          {/* เอกสารอนุมัติสินเชื่อ *	File Upload			 */}
        </Grid>
        <Grid item xs={4} hidden={payTypeSelected != "CL"}>
          <InputLabel id="ddlTerm-label" className={css.scaleLabel}>
            {L_Term}
          </InputLabel>
          <Select
            labelId="ddlTerm-label"
            id="ddlTerm"
            value={ddlterm}
            onBlur={onBlurTerm}
            fullWidth
          >
            {listTerm
              .sort((a, b) => (a.order > b.order ? 1 : -1))
              .map((data, i) => (
                <MenuItem key={i} value={data.value}>
                  {data.text}
                </MenuItem>
              ))}
          </Select>
          {/* เลือกจำนวน งวด	6 (DropDown )		กรณี ที่ มาจาก Branch		** Default MAX Term	
	            Text Label		กรณี ที่มาจาก TeleSale จำดึงมาจาก Transection			 */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
