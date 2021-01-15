import { Card, CardContent, CardHeader, Grid, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useStylesTeleSale } from "../styles";
import { PaymentPA } from "./paymentpa";
import { PayType } from "./paytype";
import { PaymentSummary } from "./paymentsummary";
import { PayTypeDetail } from "./paytypedetail";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ListProductQuotation, ListQuotaPlan, ProductQuotation } from '../../../stores/recoil/product'
import { ListPayType, ListCreditCardType } from "../../../stores/recoil/payment";
import { paymentService } from '../../../services/payment';
import roundTo from 'round-to';

const defaultProps = {
  m: 1,
  border: 1,
  borderColor: "grey.300",
  padding: "2em 1em 2em 1em",
  borderRadius: "borderRadius"
};

export const Payment = () => {
  const cssApp = useStylesTeleSale();
  //==================== Get List Product ==================================
  const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
  const [listQuotaPlan, setListQuotaPlan] = useRecoilState(ListQuotaPlan);
  const [listProductPA, setListProductPA] = useState<ProductQuotation[]>([]);
  const [listPayType, setListPayType] = useRecoilState(ListPayType);
  const [listCreditCardType, setListCreditCardType] = useRecoilState(ListCreditCardType);

  const [payTypeSelected, setPayTypeSelected] = useState("");
  const [termSelected, setTermSelected] = useState("6");
  const [countProduct, setCountProduct] = useState(0);
  const [totalPremium, setTotalPremium] = useState("");

  // =============   mock product =======================
  useEffect(() => {
    let productGroup = localStorage.getItem('ProductGroup') as string
    let productType = localStorage.getItem('ProductType') as string
    let mockQuotaPlan = [{ productkey: "PAFM04", amount: 1 }, { productkey: "PAFM05", amount: 1 }];
    let mockListProductQuotation = [{
      no: 1,
      name: productGroup,
      type: productType,
      isplan: true,
      register: '',
      ref: '',
      plan: [
        {
          "companyname": "SCI",
          "productkey": "PAFM04",
          "icon": "",
          "producttypename": "ครอบครัวอุ่นใจ",
          "productname": "แผน 4",
          "premium": "10,000 ฿",
          "premiummode": "ต่อปี",
          "maxpolicy": 3,
          "coverageshortdetails": [
            {
              "coverageid": 1,
              "coveragetext": "คุ้มครองสูงสุด",
              "coveragevalue": "20,000",
              "order": 1
            },
            {
              "coverageid": 2,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทั่วไป",
              "coveragevalue": "20,000",
              "order": 2
            },
            {
              "coverageid": 3,
              "coveragetext": "ค่ารักษาพยาบาล",
              "coveragevalue": "ครั้งละ 5,000",
              "order": 3
            },
            {
              "coverageid": 4,
              "coveragetext": "ค่าทั่วไป",
              "coveragevalue": "ครั้งละ 6,000",
              "order": 4
            }
          ],
          "coveragealldetails": [
            {
              "coverageid": 1,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทั่วไป",
              "coveragevalue": "20,000",
              "order": 1
            },
            {
              "coverageid": 2,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทสาธารณะ",
              "coveragevalue": "20,000",
              "order": 2
            },
            {
              "coverageid": 3,
              "coveragetext": "ถูกฆาตกรรมหรือทำร้ายร่างกาย",
              "coveragevalue": "20,000",
              "order": 3
            },
            {
              "coverageid": 4,
              "coveragetext": "ขณะขับขี่หรือโดยสารรถยนต์",
              "coveragevalue": "20,000",
              "order": 4
            },
            {
              "coverageid": 5,
              "coveragetext": "ค่ารักษาพยาบาล",
              "coveragevalue": "ครั้งละ 6,000",
              "order": 5
            },
            {
              "coverageid": 6,
              "coveragetext": "ชดเชยรายได้",
              "coveragevalue": "500 ค่อวัน",
              "order": 6
            },
            {
              "coverageid": 7,
              "coveragetext": "ค่าปลงศพและค่่าใช้จ่ายในการจัดงานศพ",
              "coveragevalue": "20,000",
              "order": 7
            },
            {
              "coverageid": 8,
              "coveragetext": "เงินชดเชยปลอบขวัญ",
              "coveragevalue": "5,000",
              "order": 8
            }
          ]
        },
        {
          "companyname": "SCI",
          "productkey": "PAFM05",
          "icon": "",
          "producttypename": "ครอบครัวอุ่นใจ",
          "productname": "แผน 5",
          "premium": "50,000 ฿",
          "premiummode": "ต่อปี",
          "maxpolicy": 3,
          "coverageshortdetails": [
            {
              "coverageid": 1,
              "coveragetext": "คุ้มครองสูงสุด",
              "coveragevalue": "20,000",
              "order": 1
            },
            {
              "coverageid": 2,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทั่วไป",
              "coveragevalue": "20,000",
              "order": 2
            },
            {
              "coverageid": 3,
              "coveragetext": "ค่ารักษาพยาบาล",
              "coveragevalue": "ครั้งละ 5,000",
              "order": 3
            },
            {
              "coverageid": 4,
              "coveragetext": "ค่าทั่วไป",
              "coveragevalue": "ครั้งละ 6,000",
              "order": 4
            }
          ],
          "coveragealldetails": [
            {
              "coverageid": 1,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทั่วไป",
              "coveragevalue": "20,000",
              "order": 1
            },
            {
              "coverageid": 2,
              "coveragetext": "คุ้มครองชีวิตจากอุบัติเหตุทสาธารณะ",
              "coveragevalue": "20,000",
              "order": 2
            },
            {
              "coverageid": 3,
              "coveragetext": "ถูกฆาตกรรมหรือทำร้ายร่างกาย",
              "coveragevalue": "20,000",
              "order": 3
            },
            {
              "coverageid": 4,
              "coveragetext": "ขณะขับขี่หรือโดยสารรถยนต์",
              "coveragevalue": "20,000",
              "order": 4
            },
            {
              "coverageid": 5,
              "coveragetext": "ค่ารักษาพยาบาล",
              "coveragevalue": "ครั้งละ 6,000",
              "order": 5
            },
            {
              "coverageid": 6,
              "coveragetext": "ชดเชยรายได้",
              "coveragevalue": "500 ค่อวัน",
              "order": 6
            },
            {
              "coverageid": 7,
              "coveragetext": "ค่าปลงศพและค่่าใช้จ่ายในการจัดงานศพ",
              "coveragevalue": "20,000",
              "order": 7
            },
            {
              "coverageid": 8,
              "coveragetext": "เงินชดเชยปลอบขวัญ",
              "coveragevalue": "5,000",
              "order": 8
            }
          ]
        }
      ]
    }];
    console.log(mockQuotaPlan)
    console.log(mockListProductQuotation)
    setListProductPA(mockListProductQuotation.filter(m => m.name === "PA"));
  }, [])

  useEffect(() => {
    let count = 0;
    let total = 0;
    listProductPA.map(list => {
      let _plan = list.plan.map(m => {
        count = count + 1;
        total = total + parseInt(m.premium.replace(",", ""))
      });

    })
    total = Number(total)
    setCountProduct(count);
    setTotalPremium(currencyFormat(total))
  }, [listProductPA])

  //==================== Get PayType ==================================
  const GetPayTypeAll = async () => {
    // setLoading(true)
    let _result = await paymentService.GetPayType();
    setListPayType(_result.data)
    if (_result.data.length > 0) {
      setPayTypeSelected(_result.data[0].paytypecode)
    }
    // setLoading(false)
  }

  //==================== Get PayType ==================================
  const GetCreditCardTypeAll = async () => {
    // setLoading(true)
    let _result = await paymentService.GetCreditCardType();
    console.log('_result GetCreditCardType', _result)
    setListCreditCardType(_result.data)
    if (_result.data.length > 0) {
      // setListCreditCardType(_result.data[0].CreditCardtypecode)
    }
    // setLoading(false)
  }

  useEffect(() => {
    GetPayTypeAll()
    GetCreditCardTypeAll()
  }, [])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ margin: "1em" }}>
            <CardHeader
              title="สรุปข้อมูลรายละเอียด"
              titleTypographyProps={{ variant: "h6" }}
              className={cssApp.cardHeader}
            />
            <CardContent>
              <Grid container spacing={2}>
                <PaymentPA listProductPA={listProductPA} />
                <Box  {...defaultProps} width="100%">
                  <PayType payTypeSelected={payTypeSelected} setPayTypeSelected={setPayTypeSelected} />
                  <PayTypeDetail payTypeSelected={payTypeSelected} />
                </Box>
                <Box  {...defaultProps} width="100%">
                  <PaymentSummary payTypeSelected={payTypeSelected} countProduct={countProduct} totalPreminum={totalPremium} />
                </Box>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};



const currencyFormat = (price: number) => {
  return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


const installment = (price: number, mouth: number) => {
  return roundTo.up((price / mouth), 0)
}