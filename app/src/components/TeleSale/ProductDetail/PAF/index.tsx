import React, { useState, useEffect } from 'react';
import { useStylesTeleSale } from '../../styles';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Field } from './field'
import { Coverage } from './coverage'
import Insurance from './insurance'
import {
    Button,
} from "@material-ui/core";

interface Prop {

}

const title = [
    'ข้อมูลผู้เอาประกันคนที่ 1 *', 'ข้อมูลผู้เอาประกันคนที่ 2 : คู่สมรส *', 'ข้อมูลบุตร'
];

export const PAF: React.FC<Prop> = ({ }) => {
    const cssApp = useStylesTeleSale();
    const css = useStyles();

    const [quotationData, setQuotationData] = useState<any>();

    return (
        <React.Fragment>
            {
                title.map((m, i) => <Field title={m} nameObj={'insured' + i} changedValue={(name, value) => {
                    setQuotationData({ ...quotationData, [name]: value })
                }} />)
            }
            <Coverage/>
            <Insurance/>
            <Button size="small" variant="contained" className={css.buttonSave}>
                Save
            </Button>
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    paddingAccordion: {
        padding: '0px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    marginAccordion: {
        margin: '0px'
    },
    expandIconAccordion: {
        marginRight: '0px',
        padding: '0px'
    },
    autocompleteinput: {
        paddingTop: '0px !important',
        paddingBottom: '3px !important'
    },
    labeloutlined: {
        top: '-7px'
    },
    popupIndicator: {
        top: '-3px'
    },
    buttonSave: {
        marginTop: '1em',
        marginBottom: '1em',
        float: 'right'
    }
}));