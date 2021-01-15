import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Checkbox,
  Slide,
} from "@material-ui/core";
import { useStyles } from "../styles";
import * as React from "react";
import { useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Field } from "../../../components/TeleSale/ProductDetail/type";
import { DialogDetail } from "./dialogDetail";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { RootProductFieldStore } from "../../../stores/productField.store";
import { useDispatch, useSelector } from "react-redux";
import { UpdateField } from "../../../stores/actions/productField.action";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogFieldProp {
  open: boolean;
  setParent: (isOpent: boolean) => void;
}

export const DialogField: React.FC<DialogFieldProp> = ({
  open,
  setParent,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state: RootProductFieldStore) => state.productField.selectedProductForm);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [fields, setFiels] = useState<Field[]>();
  const [fieldDetail, setFielDetail] = useState<Field>();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setFiels(selector.fields);
  }, [selector])

  const handleClose = () => {
    setIsOpen(false);
    setParent(false);
  };

  const handleDelete = async (order: number) => {
    let data = selector;
    data = {
      ...data,
      fields: [...data.fields.filter((f) => f.order !== order)],
    };
    dispatch(UpdateField(data));
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Config Field
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: 20 }}>
        <DialogDetail
          isOpen={isOpenDetail}
          fieldDetail={fieldDetail}
          setParent={(isOpen) => {
            setIsOpenDetail(isOpen);
            setFielDetail(undefined);
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            color="primary"
            onClick={() => {
              setFielDetail(undefined);
              setIsOpenDetail(true);
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box style={{ marginTop: 5 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="3%">
                    Edit
                  </TableCell>
                  <TableCell align="center" width="3%">
                    Delete
                  </TableCell>
                  <TableCell width="5%">Order</TableCell>
                  <TableCell width="10%">Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Lable</TableCell>
                  <TableCell style={{ minWidth: 100 }}>Data Type</TableCell>
                  <TableCell style={{ minWidth: 100 }}>Element Type</TableCell>
                  <TableCell width="10%">Data Field</TableCell>
                  <TableCell align="center" width="5%">
                    Required
                  </TableCell>
                  <TableCell style={{ minWidth: 80 }} align="center" width="5%">
                    Read Only
                  </TableCell>
                  <TableCell style={{ minWidth: 80 }} align="center" width="5%">
                    Full Width
                  </TableCell>
                  <TableCell align="right" width="5%">
                    Width
                  </TableCell>
                  <TableCell align="right" width="5%">
                    SM
                  </TableCell>
                  <TableCell align="right" width="5%">
                    XS
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }} width="10%">
                    Dropdown API
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields
                  ? fields
                    .sort((a, b) => a.order > b.order ? 1 : -1)
                    .map((field: Field) => (
                      <TableRow key={field.order} hover>
                        <TableCell align="center">
                          <IconButton
                            aria-label="compare"
                            color="primary"
                            size="small"
                            onClick={() => {
                              setFielDetail(field);
                              setIsOpenDetail(true);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="compare"
                            color="secondary"
                            size="small"
                            onClick={() => {
                              handleDelete(field.order);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {field.order}
                        </TableCell>
                        <TableCell>{field.name}</TableCell>
                        <TableCell>{field.lable}</TableCell>
                        <TableCell>{field.type}</TableCell>
                        <TableCell>{field.elementType}</TableCell>
                        <TableCell>{field.dataField}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={field.required}
                            readOnly={true}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={field.readOnly}
                            readOnly={true}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={field.fullWidth}
                            readOnly={true}
                          />
                        </TableCell>
                        <TableCell align="right">{field.width}</TableCell>
                        <TableCell align="right">{field.sm}</TableCell>
                        <TableCell align="right">{field.xs}</TableCell>
                        <TableCell>{field.dropdownApi}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Dialog>
  );
};
