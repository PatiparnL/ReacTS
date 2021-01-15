import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CardDetail, CardContainer, ConfirmDialog } from "../../UI";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    Tabs,
    Tab,
    Button
} from "@material-ui/core";
import { DialogProductBundle } from "./Bundle";
import { DialogCompare } from "./Compare/index";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { teleSaleService } from '../../../services/telesale';
import { Loading } from "../../../stores/recoil/load";
import dayjs from "dayjs";
import { TaskInsurerDetail_Response } from "../../../models/telesale";
import {
    TaskProduct
} from "../../../stores/recoil/productCampaign";
import {
    ListProductQuotation,
    ProductQuotation,
    GetOpenCompare
} from '../../../stores/recoil/product'


const SwitchProductType = (param: string | undefined): string => {
    switch (param) {
        case 'AUTO':
            return '01';
        case 'PA':
            return '02';
        case 'CTP':
            return '03';
        case 'TAX':
            return '04';
        case 'CANCER':
            return '05';
        default:
            return '';
    }
}

interface Props {

}

export const Products = () => {
    const css = useRowStyles();

    const setLoading = useSetRecoilState(Loading);
    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
    const [isOpenCompare, setIsOpenCompare] = useRecoilState(GetOpenCompare);
    const setTaskProduct = useSetRecoilState(TaskProduct);

    const [value, setValue] = React.useState(-1);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isProductGroupNull, setIsProductGroupNull] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [productGroup, setProductGroup] = useState('');
    const [productType, setProductType] = useState('');

    useEffect(() => {
        let productGroup = localStorage.getItem('ProductGroup') as string
        let productType = localStorage.getItem('ProductType') as string
        setProductGroup(productGroup)
        setProductType(productType)
        if (productGroup.length === 0)
            setIsProductGroupNull(true)
    }, [localStorage.getItem('ProductGroup')]);

    useEffect(() => {
        if (isProductGroupNull) {
            setListProductQuotation([])
        }
        else {
            setListProductQuotation([{
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
            }]);
        }
    }, [productGroup, isProductGroupNull]);

    const GetTasKProductAll = async () => {
        setLoading(true)
        var request = {
            application: process.env.REACT_APP_APPLICATION as string,
            productgroupcode: '',
            saleschannel: process.env.REACT_APP_SALESCHANNEL as string,
            effectivedate: dayjs().format("YYYY-MM-DD"),
            expiredate: null,
            conditions: {
                isgetall: 'true'
            }
        }
        let _result = await teleSaleService.GetTaskProduct(request);
        setTaskProduct(_result.data)
        setLoading(false)
    }
    const GetTasKProductBundle = async () => {
        setLoading(true)
        let productgroupcode = SwitchProductType(productGroup)
        var request = {
            application: process.env.REACT_APP_APPLICATION as string,
            productgroupcode: productgroupcode,
            saleschannel: process.env.REACT_APP_SALESCHANNEL as string,
            effectivedate: dayjs().format("YYYY-MM-DD"),
            expiredate: null,
            conditions: {
                bundle: '1',
                producttype: localStorage.getItem('ProductType') as string
            }
        }
        let _result = await teleSaleService.GetTaskProduct(request);
        setTaskProduct(_result.data)
        setLoading(false)
    }
    const GetTasKProduct = async (name: string | undefined) => {
        setLoading(true)
        var request = {
            application: process.env.REACT_APP_APPLICATION as string,
            productgroupcode: SwitchProductType(name),
            saleschannel: process.env.REACT_APP_SALESCHANNEL as string,
            effectivedate: dayjs().format("YYYY-MM-DD"),
            expiredate: null,
            conditions: {
                bundle: '0'
            }
        }
        let _result = await teleSaleService.GetTaskProduct(request);
        setTaskProduct(_result.data)
        setLoading(false)
    }

    const handleBundle = () => {
        setTaskProduct([])
        if (isProductGroupNull)
            GetTasKProductAll()
        else
            GetTasKProductBundle()
        setIsOpenAdd(true)
    };
    const handleProductGroup = (name: string | undefined) => {
        setTaskProduct([])
        GetTasKProduct(name)
        setIsOpenAdd(true)
    };
    const handleDelete = (no: number) => {
        let filterarray = listProductQuotation.filter(f => f.no !== no)
        setOpenDelete(true);
    };

    const Row = (props: { row: ProductQuotation, max: number }) => {
        const { row, max } = props;
        const [open, setOpen] = React.useState(false);
        const css = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={css.root}>
                    <TableCell>
                        {
                            row.isplan ?
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                : null
                        }

                    </TableCell>
                    <TableCell align="left">{row.no}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.register}</TableCell>
                    <TableCell align="left">{row.ref}</TableCell>
                    <TableCell align="center">
                        {(productGroup === row.name) ?
                            <IconButton
                                aria-label="expand row"
                                color="secondary"
                                size="small"
                                onClick={() => { handleProductGroup(row.name) }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                            :
                            <IconButton
                                aria-label="expand row"
                                color="secondary"
                                size="small"
                                onClick={() => { handleDelete(row.no) }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, maxWidth: '700px' }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {
                                row.isplan ?
                                    <Box margin={1}>
                                        <CardContainer title={`เราพบ ${row.plan.length} แผนประกันที่เหมาะกับคุณ`} isShow={true} no={row.no}>
                                            <Tabs
                                                value={value}
                                                indicatorColor="primary"
                                                textColor="primary"
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                aria-label="scrollable auto tabs example"
                                            >
                                                {
                                                    row.plan.map((m: TaskInsurerDetail_Response) => {
                                                        return (
                                                            <Tab className={css.tablast} icon={<CardDetail isShowButtonDetail={false} plan={m} max={max} />} />
                                                        )
                                                    })
                                                }
                                            </Tabs>
                                        </CardContainer>
                                    </Box>
                                    : null
                            }
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return <div style={{ width: "100%" }}>
        <DialogProductBundle
            open={isOpenAdd}
            setParent={() => { setIsOpenAdd(false) }} />
        <DialogCompare
            isOpenCompare={isOpenCompare}
            setIsOpenCompare={() => { setIsOpenCompare(false) }} />
        <ConfirmDialog
            isOpen={openDelete}
            setMainOpen={setOpenDelete}
            title="Delete Product Group?"
            message='' />
        <Box display="flex" justifyContent="flex-end">
            <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => { handleBundle() }}
            >
                <AddIcon />
            </IconButton>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>No.</TableCell>
                            <TableCell>กลุ่มผลิตภัณฑ์</TableCell>
                            <TableCell>ประเภทผลิตภัณฑ์</TableCell>
                            <TableCell>ทะเบียน</TableCell>
                            <TableCell>อ้างอิง</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProductQuotation.map((row) => {
                            let max = 0
                            row.plan.map((m) => {
                                if (max < m.coverageshortdetails.length)
                                    max = m.coverageshortdetails.length
                            })
                            return <Row key={row.name} row={row} max={max} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" className={css.buttonQutoe}>
                พิมพ์ใบเสนอราคา
            </Button>
        </Box>
    </div>
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tablast: {
        height: 'auto',
        minWidth: '350px',
        margin: 2,
        padding: 5
    },
    buttonQutoe: {
        display: 'flex',
        top: '25px',
        float: 'right'
    }
});
