import { Card, CardContent, Grid, Tab, Tabs } from "@material-ui/core";
import { useStyles } from "../styles";
import React, { useState } from "react";
import { motion } from "framer-motion"
import { CardContainer } from "../../../UI";
import { TaskProduct_Response } from "../../../../models/telesale";
import { useSetRecoilState } from 'recoil';
import DefaultImg from "../../../../assets/images/productGroups/default.png";
import { GetGroupName } from '../../../../stores/recoil/product'

interface Props {
    productCampaigns: TaskProduct_Response[];
    toggle: (index: number, selectedId: string) => void;
}

export const Product: React.FC<Props> = ({ productCampaigns, toggle }) => {
    const cssProduct = useStyles();

    const [productSelected, setProductSelected] = useState(-1);
    const setGetGroupName = useSetRecoilState(GetGroupName);

    const productSelectedHandle = (event: React.ChangeEvent<{}>, newValue: number) => {
        setGetGroupName(productCampaigns[newValue].groupname as string)
        setProductSelected(newValue);
        toggle(newValue, productCampaigns[newValue].groupname);
    };

    const mapProductToImage = (img: string) => {
        if (img != null)
            return 'data:image/png;base64,' + img
        else
            return DefaultImg;
    }

    return (
        <CardContainer title="กลุ่มผลิตภัณฑ์" isShow={false} no={undefined}>
            <Grid item xs={12}>
                <Tabs
                    value={productSelected}
                    onChange={productSelectedHandle}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="primary"
                >
                    {
                        productCampaigns.map(pc => (
                            <Tab className={cssProduct.tab}
                                icon={
                                    <motion.div
                                        className={cssProduct.motion}
                                        whileHover={cssProduct.whileHover}
                                        transition={{ duration: 0.3 }}>
                                        <Card className={cssProduct.card} elevation={2}>
                                            <CardContent>
                                                <img src={mapProductToImage(pc.img)} className={cssProduct.imgwh}/>
                                            </CardContent>
                                        </Card>
                                    </motion.div>}
                            />
                        )
                        )
                    }

                </Tabs>
            </Grid>
        </CardContainer>
    );
}