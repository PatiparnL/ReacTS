import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { Header } from "../../components/TeleSale/Header";

import { ProductForm, Field } from "../../components/TeleSale/ProductDetail/type";
import { useStyles } from "./styles";
import { GetAll, GetById } from "../../stores/actions/productField.action";
import { useDispatch, useSelector } from "react-redux";

import { RootProductFieldStore } from "../../stores/productField.store";

import { DialogField } from "./components/dialogFields";
import { ProductFormBox } from "./components/productFormBox";
import Layout from "../../components/Layout";

const ConfigProductField = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootProductFieldStore) => state);
  const classes = useStyles();
  const [configs, setConfigs] = useState<ProductForm[]>([]);

  useEffect(() => {
    dispatch(GetAll());
  }, []);

  useEffect(() => {
    setConfigs(selector.productField.productForms);
  }, [selector]);

  const [open, setOpen] = useState(false);

  const selectedFormHandle = (id: number) => {
    dispatch(GetById(id));
    setOpen(true);
  };

  return (
    <Layout>
      <Header title="Config product field" />
      <DialogField open={open} setParent={() => { setOpen(false) }} />
      <Paper className={classes.paper} elevation={0}>
        <Grid container>
          {configs ? (
            configs.map((c) => (
              <Grid item xs={4}>
                <ProductFormBox
                  form={c}
                  selectedFormToggle={selectedFormHandle}
                />
              </Grid>
            ))
          ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" color="inherit">
                  No JSON Server!!
              </Typography>
              </Box>
            )}
        </Grid>
      </Paper>
    </Layout>
  );
};

export default ConfigProductField;
