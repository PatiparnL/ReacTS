import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { CardContainer, CardDetail } from "../../../UI";
import { motion } from "framer-motion";
import { Grid, Tab, Tabs, makeStyles, Button } from "@material-ui/core";
import { TaskInsurerDetail_Response } from "../../../../models/telesale";
import { ListProductQuotation, ProductQuotation, GetGroupName } from '../../../../stores/recoil/product'
import { GetAlert, RecoilAlert } from "../../../../stores/recoil/alert";

interface Props {
    data: TaskInsurerDetail_Response[];
    handleClose: any;
    selectedCompany: string | undefined,
}

export const Detail: React.FC<Props> = ({ data, handleClose, selectedCompany }) => {
    const css = useStyles();

    const [insurerPlan, setInsurerPlan] = useState(-1);
    const [maxCoverageDetial, setMaxCoverageDetial] = useState(0);
    const [selectPlan, setSelectPlan] = useState<TaskInsurerDetail_Response>({
        companyname: '',
        productkey: '',
        icon: '',
        producttypename: '',
        productname: '',
        premium: '',
        premiummode: '',
        maxpolicy: 0,
        coverageshortdetails: [],
        coveragealldetails: []
    });

    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
    const getGroupName = useRecoilValue(GetGroupName);
    const [alert, setAlert] = useRecoilState(GetAlert);

    useEffect(() => {
        let max = 0
        data.map((m: TaskInsurerDetail_Response) => {
            if (max < m.coverageshortdetails.length)
                max = m.coverageshortdetails.length
        })
        setMaxCoverageDetial(max)
    }, [data])

    useEffect(() => {
        setInsurerPlan(-1)
    }, [selectedCompany])

    const InsurerPlanSelectedHandle = (event: React.ChangeEvent<{}>, newValue: number) => {
        setInsurerPlan(newValue);
        setSelectPlan(data[newValue])
    };

    const handleClickSelectPlan = () => {
        let maxNo = listProductQuotation.length == 0 ? 0 : Math.max.apply(Math,
            listProductQuotation.map((o: ProductQuotation) => {
                return o.no;
            })
        )
        let group = listProductQuotation.find((f: ProductQuotation) => f.name === getGroupName)
        if (group) {
            let plan = group.plan.findIndex((f: TaskInsurerDetail_Response) => f.productkey === selectPlan.productkey)
            if (plan === -1) {
                let indexGroup = listProductQuotation.findIndex((f: ProductQuotation) => f.name === getGroupName)
                let code = [selectPlan]
                let item = { ...listProductQuotation[indexGroup] };
                item.plan = [...group.plan, ...code]
                setListProductQuotation(prev => [
                    ...prev.slice(0, indexGroup),
                    item,
                    ...prev.slice(indexGroup + 1, prev.length - 1),
                ])
                handleClose()
            }
            else {
                setAlert({ open: true, message: 'แผนซ้ำ !!!!!!!!!!!!!' } as RecoilAlert)
            }
        }
        //new Group
        else {
            let obj = {
                no: maxNo + 1,
                name: getGroupName,
                type: '',
                register: '',
                ref: '',
                isplan: true,
                plan: [selectPlan]
            }
            setListProductQuotation([...listProductQuotation, obj])
            handleClose()
        }
    }

    const RenderCardContent = (d: TaskInsurerDetail_Response) => {
        return (
            <motion.div transition={{ duration: 0.3 }}>
                <CardDetail isShowButtonDetail={true} plan={d} max={maxCoverageDetial} />
            </motion.div>
        )
    }

    return (
        <CardContainer title="InsurerDetail" isShow={false} no={undefined}>
            <Tabs
                value={insurerPlan}
                onChange={InsurerPlanSelectedHandle}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="primary"
            >
                {data.map((pc) => (
                    <Tab
                        key={pc.productname}
                        className={css.tabinsurerdetail}
                        icon={
                            RenderCardContent(pc)
                        }
                    />
                ))}
            </Tabs>
            <Grid container item xs={12} justify="flex-end">
                <Grid item xs={12} sm={4} md={2}>
                    <Button variant="outlined" onClick={() => { handleClickSelectPlan() }} fullWidth>
                        เลือกแผน
                    </Button>
                </Grid>
            </Grid>
        </CardContainer>
    )
}


const useStyles = makeStyles((theme) => ({
    tabinsurerdetail: {
        height: 'auto',
        minWidth: '350px',
        margin: 2,
        padding: 5
    },
}))