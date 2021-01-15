import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useStylesTeleSale } from '../styles';

import { Grid, Divider, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { Loading } from "../../../stores/recoil/load";

import { PAF } from './PAF/index';
interface Props {
  productType: string | undefined
}

export const Detail: React.FC<Props> = ({ productType }) => {
  const cssApp = useStylesTeleSale();
  const css = useStyles();
  const [loading, setLoading] = useRecoilState(Loading);

  useEffect(() => {
    console.log(productType)
  }, [productType])

  const RenderProductDetail = (productType: string | undefined) => {
    switch (productType?.toLowerCase()) {
      case 'paf' : return <PAF />;
      default: return <></>;
    }
  }

  return <React.Fragment>
    {
       RenderProductDetail(productType)
    }
  </React.Fragment>
  
}

const useStyles = makeStyles((theme: Theme) => ({
 
}));