import React, { useState } from "react";
import { useStyles } from "../styles";
import { Card, CardContent, Tab, Tabs } from "@material-ui/core";
import { CardContainer } from "../../../UI";
import { Companys } from "../../../../models/telesale";
import { motion } from "framer-motion";

import DefaultImg from "../../../../assets/images/productGroups/default.png";

interface Props {
    companies: Companys[];
    toggle: (index: number, selectedId: string, producttype: string[]) => void;
}

export const Company: React.FC<Props> = ({ companies, toggle }) => {
    const cssProduct = useStyles();

    const [companySelected, setCompanySelected] = useState(-1);

    const productSelectedHandle = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCompanySelected(newValue);
        toggle(newValue, companies[newValue].code, companies[newValue].producttype);
    };

    const mapCompanyToImage = (img: string) => {
        if (img != null)
            return 'data:image/png;base64,' + img
        else
            return DefaultImg;
    }

    return (
        <CardContainer title="บริษัทประกัน" isShow={false} no={undefined}>
            <Tabs
                value={companySelected}
                onChange={productSelectedHandle}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="secondary"
                textColor="primary"
            >
                {
                    companies.map(pc => (
                        <Tab className={cssProduct.tab}
                            icon={
                                <motion.div
                                    className={cssProduct.motion}
                                    whileHover={cssProduct.whileHover}
                                    transition={{ duration: 0.3 }}>
                                    <Card className={cssProduct.card} elevation={2}>
                                        <CardContent>
                                            <img src={mapCompanyToImage(pc.img)} className={cssProduct.imgwh}/>
                                        </CardContent>
                                    </Card>
                                </motion.div>}
                        />
                    ))
                }

            </Tabs>
        </CardContainer>
    );
}