import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { CardContainer } from "../../../UI";
import { TaskCompany_Response, TaskInsurerDetail_Response, CoverageDetail } from '../../../../models/telesale';
import {
    Grid,
    AppBar,
    Tab,
    Tabs,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControlLabel,
    Checkbox,
    Paper
} from "@material-ui/core";
import {
    ListProductQuotation,
    GetGroupNameToCompare
} from '../../../../stores/recoil/product'
import { makeStyles, useTheme } from '@material-ui/core/styles';

interface Props {
}

export const CompareDetail: React.FC<Props> = ({ }) => {
    const theme = useTheme();
    const css = useStyles();

    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
    const [groupNameToCompare, setGroupNameToCompare] = useRecoilState(GetGroupNameToCompare);

    const [data, setData] = useState<TaskInsurerDetail_Response[]>([]);
    const [datatab, setDataTab] = useState<string[]>([]);
    const [value, setValue] = useState(0);

    const fixed = {
        position: 'sticky',
        background: '#fff',
        left: 0,
        zIndex: 1,
    }

    useEffect(() => {
        let group = listProductQuotation.find(f => f.no == groupNameToCompare)
        let uniqueCompanyname = group?.plan.filter((ele, ind) => ind === group?.plan.findIndex(elem => elem.companyname === ele.companyname)).map(m => m.companyname)
        setDataTab(uniqueCompanyname as string[])
        setData(group?.plan as TaskInsurerDetail_Response[])
    }, [listProductQuotation])

    const RenderTab = (data: string[]) => {
        return (
            data.map((company: string, i: any) => {
                return (<Tab label={company} {...a11yProps(i)} />)
            })
        )
    }

    const handleDataPlan = (data: TaskInsurerDetail_Response[]) => {
        let array: CoverageDetail[] = []
        let count: number = 0
        data.map((m: TaskInsurerDetail_Response, i: number) => {
            m.coveragealldetails.map((c: CoverageDetail) => {
                array.push(c)
            })
            count = i + 1
        })
        let uniqueId = array.sort((a, b) => a.order > b.order ? 1 : -1).filter((ele, ind) => ind === array.findIndex(elem => elem.coverageid === ele.coverageid))
        let rows: any[] = []
        uniqueId.map((m: CoverageDetail) => {
            let obj: any = { detail: m.coveragetext }
            let newObj = Object.assign({}, obj);
            Array.from(Array(count).keys()).map((j: number, i: number) => {
                let dataPlan = data[j].coveragealldetails.find(f => f.coverageid == m.coverageid)
                let newInput = `plan${j + 1}`;
                newObj[newInput] = dataPlan ? dataPlan?.coveragevalue : "";
            })
            rows.push(newObj)
        })
        return rows
    }

    const RenderTableHead = (data: TaskInsurerDetail_Response[]) => {
        return (
            datatab.map((d: string, i: number) => {
                let arrayCompany = data?.filter(f => f.companyname == d)
                let rows = handleDataPlan(arrayCompany)
                return (
                    <TabPanel value={value} index={i}>
                        <TableContainer component={Paper}>
                            <Table className={css.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={fixed as any}>ความคุ้มครอง</TableCell>
                                        {
                                            arrayCompany?.map((a: TaskInsurerDetail_Response, i: any) => {
                                                return (
                                                    <TableCell align="center">{a.productname}</TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rows.map((row: any, i: number) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell align="left" style={fixed as any}>{row.detail}</TableCell>
                                                    {
                                                        rows.map((p2: any, i2: number) => {
                                                            var name = 'plan' + (i2 + 1)
                                                            return (row[name] ? <TableCell align="center">{row[name]}</TableCell> : row[name] == "" ? <TableCell align="center"></TableCell> : null)
                                                        })
                                                    }
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <Typography variant="overline" display="block" style={{ marginTop: '1em' }} gutterBottom>
                            * เงื่อนไขการรับประกัน
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            1. อายุรับประกัน 20-60 ปี ( ต่ออายุ ถึง 65 ปี )
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            2. ส่วนลด 10% สำหรับการซื้อกรมธรรม์ที่ 2 สำหรับ คู่สมรส และ บิดา มารดา
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            3. มีระยะเวลารอคอยเรื่องค่าปลงศพ จากการเจ็บป๋วย 180 วัน
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            4. คำถามสุขภาพ : ไม่มี
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            5. อาชีพที่รับประกัน : ไม่มี
                        </Typography> */}
                    </TabPanel>
                )
            })
        )
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            {
                datatab.length > 0 ?
                    <CardContainer title="ข้อมูลใบเสนอราคา : QT1234567890" isShow={false} no={undefined}>
                        <Grid item xs={12}>
                            <React.Fragment>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        {
                                            RenderTab(datatab)
                                        }
                                    </Tabs>
                                </AppBar>
                                {
                                    RenderTableHead(data)
                                }
                            </React.Fragment>
                        </Grid>
                    </CardContainer>
                    : null
            }
        </React.Fragment>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}