import React, { useEffect, useState } from "react";
import { AppBar, Box, Dialog, Grid, IconButton, Slide, Toolbar, Typography } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Product } from "./product";
import { Company } from "./company";
import { Detail } from "./detail";
import { ProductType } from "./producttype";
import { useStyles } from "../styles";
import { TabPanel } from "../../../UI";

import CloseIcon from "@material-ui/icons/Close";
import { TaskHierarchy_Request, TaskHierarchy_Response, IHierarchy } from "../../../../models/telesale";
import { teleSaleService } from '../../../../services/telesale';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
    TaskProduct,
    SelectedProduct,
    SelectedCompany,
    TaskInsurerDetail,
    SelectedProductType
} from "../../../../stores/recoil/productCampaign";
import { Loading } from "../../../../stores/recoil/load";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    setParent: (isOpent: boolean) => void;
}

export const DialogProductBundle: React.FC<Props> = ({ open, setParent }) => {

    const css = useStyles();

    const [isOpen, setIsOpen] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [showInsurerDetail, setShowInsurerDetail] = useState(false);
    const [showProductType, setShowProductType] = useState(false);
    const [productSelected, setProductSelected] = useState(0);
    const [productType, setProductType] = useState<string[]>([]);

    const setLoading = useSetRecoilState(Loading);
    const [taskProduct, setTaskProduct] = useRecoilState(TaskProduct);
    const [taskInsurerDetail, setTaskInsurerDetail] = useRecoilState(TaskInsurerDetail);
    const setSelectedProduct = useSetRecoilState(SelectedProduct);
    const [selectedCompany, setSelectedCompany] = useRecoilState(SelectedCompany);
    const [selectedProductType, setSelectedProductType] = useRecoilState(SelectedProductType);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useEffect(()=>{
        setShowInsurerDetail(false)
    },[selectedCompany])

    const handleClose = () => {
        setIsOpen(false);
        setParent(false);
        setShowCompany(false)
        setShowInsurerDetail(false)
        setShowProductType(false)
        setSelectedProduct(undefined);
        setSelectedCompany(undefined);
    };

    const GetTaskInsurerDetail = async (insurerCode: string, producttype: string[]) => {
        if (insurerCode == "VIB") {
            var test = [
                {
                    "companyname": "FWD",
                    "productkey": "PAFM01",
                    "icon": "",
                    "producttypename": "ครอบครัวอุ่นใจ",
                    "productname": "แผน 1",
                    "premium": "2,000 ฿",
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
            setTaskInsurerDetail(test)
        }
        else {
            let _resultInsurerDeatail = await teleSaleService.GetTaskInsurerDetail(undefined)
            setTaskInsurerDetail(_resultInsurerDeatail.data)
        }
        if (producttype.length === 0)
            setShowInsurerDetail(true)
        setLoading(false)
    }

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={css.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={css.title}>
                        Add Product
                    </Typography>
                </Toolbar>
            </AppBar>
            { taskProduct.length > 0
                ? <Box className={css.grid}>
                    <Grid item xs={12}>
                        <Product productCampaigns={taskProduct}
                            toggle={(index, product) => {
                                setProductSelected(index);
                                setSelectedProduct(product);
                                setSelectedCompany(undefined)
                                setShowCompany(true)
                                setShowInsurerDetail(false)
                                setShowProductType(false)
                            }} />
                    </Grid>
                </Box>
                : null
            }

            { showCompany
                ? <Box className={css.grid}>
                    <Grid item xs={12}>
                        {
                            taskProduct.map((p, i) => (
                                <TabPanel
                                    value={productSelected}
                                    index={i}
                                    style={{}}>
                                    <Company companies={p.company}
                                        toggle={(index, insurerCode, producttype) => {
                                            setLoading(true)
                                            setProductType(producttype)
                                            GetTaskInsurerDetail(insurerCode, producttype)
                                            setSelectedCompany(insurerCode as string);
                                            setShowProductType(true)
                                        }} />
                                </TabPanel>
                            ))
                        }
                    </Grid>
                </Box>
                : null
            }
            { (showProductType && productType.length > 0) ?
                <Box className={css.grid}>
                    <Grid item xs={12}>
                        <TabPanel
                            value={0}
                            index={0}
                            style={{}}>
                            <ProductType data={productType} selectedCompany={selectedCompany}
                                toggle={(type) => {
                                    setSelectedProductType(type)
                                    setShowInsurerDetail(true)
                                }} />
                        </TabPanel>
                    </Grid>
                </Box>
                : null
            }

            { showInsurerDetail
                ? <Box className={css.grid}>
                    <Grid item xs={12}>
                        <TabPanel 
                            value={0}
                            index={0}
                            style={{}}>
                            <Detail data={taskInsurerDetail} handleClose={handleClose} selectedCompany={selectedCompany}/>
                        </TabPanel>
                    </Grid>
                </Box>
                : null
            }
        </Dialog>)
}