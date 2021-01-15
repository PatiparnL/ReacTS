import React, { useEffect, useState } from "react";
import { Products, Quotation, Customer, ProductDetail , Payment} from "..";

interface ContentActiveProps {
    step: number
}

export const ContentActive: React.FC<ContentActiveProps> = ({ step }) => {

    const getContent = () => {
        switch (step) {
            case 0: return <Products />;
            case 1: return <Quotation />;
            case 2: return <Customer />;
            case 3: return <ProductDetail />;
            case 4: return <Payment />;
            default: return <></>;
        }
    }

    return <>{getContent()}</>
}