import { Button, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ProductForm } from "../../../components/TeleSale/ProductDetail/type";
import { UpdateField } from "../../../stores/actions/productField.action";
import { RootProductFieldStore } from "../../../stores/productField.store";

interface DialogDetailProp {
    isOpen: boolean;
    fieldDetail?: Field;
    setParent: (isOpent: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
    }),
);

export const DialogDetail: React.FC<DialogDetailProp> = ({ isOpen = false, fieldDetail, setParent }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state: RootProductFieldStore) => state.productField);

    const [open, setOpen] = useState(false);
    const [detailForm, setDetailForm] = useState<Field>();

    useEffect(() => {
        setDetailForm(fieldDetail);
    }, [fieldDetail]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    const saveHandle = async () => {
        let selectedProductForm = { ...selector.selectedProductForm } as ProductForm;
        let productForm = selector.productForms.find((f) => f.id === selectedProductForm.id) as ProductForm;
        let exist = productForm?.fields.find(f => f.order === detailForm?.order);

        let request: ProductForm;

        if (!exist) {
            request = {
                ...selector.selectedProductForm,
                fields: [...selector.selectedProductForm.fields, detailForm]
            } as ProductForm;
        }
        else {
            let indexProducgtForm = productForm?.fields.findIndex(f => f.order === detailForm?.order) ?? 0;
            if(detailForm){
                productForm.fields[indexProducgtForm] = detailForm;
            }

            request = {
                ...selector.selectedProductForm,
                fields: [...productForm.fields]
            } as ProductForm;
        }

        dispatch(UpdateField(request));

        setOpen(false);
        setParent(false);
        setDetailForm(undefined);
    }

    const formChangeHandle = (e: any, elementType: string) => {
        let value: any;
        switch (elementType) {
            case 'text':
                value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
                setDetailForm({ ...detailForm, [e.target.name]: value } as Field)
                break;
            case 'select':
                setDetailForm({ ...detailForm, [e.target.name]: e.target.value } as Field)
                break;
            case 'check':
                setDetailForm({
                    ...detailForm,
                    [e.target.name]: detailForm ? !detailForm[e.target.name as keyof Field] : false 
                } as Field)
                break;
        }
    }

    return <>
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={() => { setOpen(false); setParent(false); }}
        >
            <DialogTitle>Product Config Detail</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <TextField
                                name="order"
                                type="number"
                                size="small"
                                variant="outlined"
                                label="Order"
                                defaultValue={detailForm?.order}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={4}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined"
                            >
                                <InputLabel>Data Type</InputLabel>
                                <Select
                                    name="type"
                                    defaultValue={detailForm?.type}
                                    onChange={(e) => { formChangeHandle(e, "select") }}
                                    label="Data Type" >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="string">String</MenuItem>
                                    <MenuItem value="number">Number</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl
                                fullWidth
                                size="small"
                                variant="outlined">
                                <InputLabel>Element Type</InputLabel>
                                <Select
                                    name="elementType"
                                    label="Element Type"
                                    defaultValue={detailForm?.elementType}
                                    onChange={(e) => { formChangeHandle(e, "select") }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="text">Text</MenuItem>
                                    <MenuItem value="dropdown">Dropdown</MenuItem>
                                    <MenuItem value="uploadFile">Upload File</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Name"
                                name="name"
                                defaultValue={detailForm?.name}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Lable"
                                name="lable"
                                defaultValue={detailForm?.lable}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Data Field"
                                name="dataField"
                                defaultValue={detailForm?.dataField}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Dropdown API"
                                name="dropdownApi"
                                defaultValue={detailForm?.dropdownApi}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={2}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Width"
                                name="width"
                                defaultValue={detailForm?.width}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={2}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="sm"
                                name="sm"
                                defaultValue={detailForm?.sm}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={2}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="xs"
                                name="xs"
                                defaultValue={detailForm?.xs}
                                onChange={(e) => { formChangeHandle(e, "text") }}
                                fullWidth />
                        </Grid>
                        <Grid item md={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="required"
                                        checked={detailForm?.required}
                                        onChange={(e) => { formChangeHandle(e, 'check') }}
                                    />}
                                label="Required"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="readOnly"
                                        checked={detailForm?.readOnly}
                                        onChange={(e) => { formChangeHandle(e, 'check') }}
                                    />}
                                label="Read Only"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="fullWidth"
                                        checked={detailForm?.fullWidth}
                                        onChange={(e) => { formChangeHandle(e, 'check') }}
                                    />}
                                label="Full Width"
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveHandle}>
                    Save
                </Button>
                <Button
                    onClick={() => { setOpen(false); setParent(false) }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
}