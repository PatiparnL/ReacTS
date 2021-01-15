import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { useStyles } from "../styles";
import { motion } from "framer-motion";
import { CardContainer } from "../../../UI";
import { Tab, Tabs, makeStyles, Card, CardContent } from "@material-ui/core";
import DefaultImg from "../../../../assets/images/productGroups/default.png";
import { TaskProduct } from "../../../../stores/recoil/productCampaign";

interface Props {
    data: string[]
    selectedCompany: string | undefined
    toggle: (type: string) => void;
}

export const ProductType: React.FC<Props> = ({ data, selectedCompany, toggle }) => {
    const cssProduct = useStyles();

    const [selectProductType, setSelectProductTypes] = useState(-1);

    const [taskProduct, setTaskProduct] = useRecoilState(TaskProduct);

    useEffect(() => {
        setSelectProductTypes(-1)
    }, [selectedCompany])

    const SelectProductTypeHandle = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectProductTypes(newValue);
        toggle(data[newValue])
    };

    const mapCompanyToImage = (productType: string | undefined) => {
        let img = taskProduct.find(f => f.imgtype.find(f2 => f2.type == productType))?.imgtype.find(f3 => f3.type == productType)?.img
        if (img)
            return 'data:image/png;base64,' + img
        else
            return DefaultImg;
    }

    return (
        <CardContainer title="ProductType" isShow={false} no={undefined}>
            <Tabs
                value={selectProductType}
                onChange={SelectProductTypeHandle}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="primary"
            >
                {data.map((pc) => (
                    <Tab className={cssProduct.tab}
                        icon={
                            <motion.div
                                className={cssProduct.motion}
                                whileHover={cssProduct.whileHover}
                                transition={{ duration: 0.3 }}>
                                <Card className={cssProduct.card} elevation={2}>
                                    <CardContent>
                                        <img src={mapCompanyToImage(pc)} className={cssProduct.imgwh} />
                                    </CardContent>
                                </Card>
                            </motion.div>}
                    />
                ))}
            </Tabs>
        </CardContainer>
    )
}