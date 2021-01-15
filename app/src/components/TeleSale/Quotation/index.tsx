import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { QuotationTable } from './table'
import {
  Box,
  Button
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { Loading } from "../../../stores/recoil/load";

export const Quotation = () => {
  const css = useStyles();
  
  const [loading, setLoading] = useRecoilState(Loading);

  return (
    <Box style={{ marginTop: '1em' }}>
      <QuotationTable />
      <Button variant="contained" className={css.buttonQutoe}>
        Save
      </Button>
    </Box>
  )
}

const useStyles = makeStyles({
  buttonQutoe: {
    display: 'flex',
    top: '25px',
    float: 'right'
  },
});