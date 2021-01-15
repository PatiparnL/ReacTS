import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import TocIcon from "@material-ui/icons/Toc";
import React, { useState } from "react";
import { ProductForm } from "../../../components/TeleSale/ProductDetail/type";
import { useStyles } from "../styles";

interface ProductFormProp {
  form: ProductForm,
  selectedFormToggle: (id: number) => void;
}
export const ProductFormBox: React.FC<ProductFormProp> = ({ form, selectedFormToggle }) => {
  const classes = useStyles();
  const openFormsHandle = (id: number) => {
    selectedFormToggle(id);
  };

  return (
    <Card className={classes.card} elevation={3}>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box display="flex" alignItems="center" style={{ width: "80%" }}>
            <Typography variant="h6" color="inherit">
              {`${form.productName}: ${form.category}`}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{ width: "20%" }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => openFormsHandle(form.id)}
            >
              <TocIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
