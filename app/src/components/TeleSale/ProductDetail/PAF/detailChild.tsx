import React, { useState, useEffect, memo } from 'react';
import { Field } from './field'
import { useStylesTeleSale } from '../../styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';

const listTitle = [
    'ข้อมูลผู้เอาประกันคนที่ 3 : บุตร 1 *', 'ข้อมูลผู้เอาประกันคนที่ 4 : บุตร 2 *'
];

interface Props {
    title: string
}

const DetailChild: React.FC<Props> = ({ title }) => {
    const cssApp = useStylesTeleSale();
    const [quotationData, setQuotationData] = useState<any>();

    return (
        <React.Fragment>
            {
                listTitle.map((m, i) => <Field title={m} nameObj={'insuredChild' + i} changedValue={(name, value) => {
                    setQuotationData({ ...quotationData, [name]: value })
                }} />)
            }
        </React.Fragment>
    )
}

export default memo(DetailChild)