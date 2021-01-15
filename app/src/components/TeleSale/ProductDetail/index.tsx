import React, { useEffect } from 'react';
import { Detail } from './detail';
import { useRecoilState } from 'recoil';
import { makeStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
} from "@material-ui/core";
import {
    ListProductQuotation,
    ProductQuotation
} from '../../../stores/recoil/product'

function Row(props: { row: ProductQuotation }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const css = useStyles();

    return (
        <React.Fragment>
            <TableRow className={css.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{row.no}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.register}</TableCell>
                <TableCell align="left">{row.ref}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Detail productType={row.type}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export const ProductDetail = () => {
    const css = useStyles();

    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);

    useEffect(() => {
        let productGroup = localStorage.getItem('ProductGroup') as string
        let productType = localStorage.getItem('ProductType') as string
        setListProductQuotation([{
            no: 1,
            name: productGroup,
            type: productType,
            isplan: true,
            register: '',
            ref: '',
            plan: []
        }, {
            no: 2,
            name: 'AUTO',
            type: 'AUTO',
            isplan: true,
            register: 'กช 4299',
            ref: 'QV99999999',
            plan: []
        }]);
    }, []);

    return (
        <Box style={{ marginTop: '1em' }}>
            <TableContainer component={Paper} style={{ overflow: 'unset' }}>
                <Table size="small" aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>No.</TableCell>
                            <TableCell>กลุ่มผลิตภัณฑ์</TableCell>
                            <TableCell>ประเภทผลิตภัณฑ์</TableCell>
                            <TableCell>ทะเบียน</TableCell>
                            <TableCell>อ้างอิง</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProductQuotation.map((row) => (
                            <Row key={row.no} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}));