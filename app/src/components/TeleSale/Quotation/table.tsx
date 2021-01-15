import React, { useEffect, useState } from "react";
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Grid,
    Typography,
    IconButton,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    InputBase
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useRecoilState } from 'recoil';
import roundTo from 'round-to';
import { Loading } from "../../../stores/recoil/load";
import {
    ListProductQuotation,
    ListQuotaPlan
} from '../../../stores/recoil/product'
import { TaskInsurerDetail_Response } from '../../../models/telesale'

export const QuotationTable = () => {
    const css = useStyles();

    const [loading, setLoading] = useRecoilState(Loading);
    const [listProductQuotation, setListProductQuotation] = useRecoilState(ListProductQuotation);
    const [listQuotaPlan, setListQuotaPlan] = useRecoilState(ListQuotaPlan);

    const [total, setTotal] = useState(0);
    const [mouth, setMouth] = useState(1);
    const [dataTable, setDataTable] = useState<TaskInsurerDetail_Response[]>([]);

    useEffect(() => {
        listProductQuotation.map(m => {
            let _plan = m.plan.filter(m2 => listQuotaPlan.find(m3 => m3.productkey == m2.productkey))
            setDataTable(old => [...old, ..._plan])
        })
    }, [listProductQuotation])

    useEffect(() => {
        let totel: number = 0
        listQuotaPlan.map(m => {
            let premium = dataTable.find(f => f.productkey == m.productkey)?.premium as string
            totel = totel + (parseInt(premium?.replace(',', '')) * m.amount)
        })
        setTotal(totel)
    }, [listQuotaPlan, dataTable])

    const handleAdd = (productkey: string) => {
        let index = listQuotaPlan.findIndex(f => f.productkey == productkey)
        let newData = { ...listQuotaPlan[index] }
        newData.amount = newData.amount + 1
        setListQuotaPlan(prev => [
            ...prev.slice(0, index),
            newData,
            ...prev.slice(index + 1),
        ])
    }

    const handleDelete = (productkey: string) => {
        let index = listQuotaPlan.findIndex(f => f.productkey == productkey)
        let newData = { ...listQuotaPlan[index] }
        if (newData.amount > 1) {
            newData.amount = newData.amount - 1
            setListQuotaPlan(prev => [
                ...prev.slice(0, index),
                newData,
                ...prev.slice(index + 1),
            ])
        }
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMouth(event.target.value as number);
    };

    return (
        <Box style={{ marginTop: '1em' }}>
            <TableContainer component={Paper}>
                <Table className={css.table} aria-label="spanning table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>รหัสผลิตภัณฑ์</TableCell>
                            <TableCell align="left">ชื่อผลิตภัณฑ์</TableCell>
                            <TableCell align="center">จำนวน</TableCell>
                            <TableCell align="right">ราคา</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((row) => (
                            <TableRow key={row.productkey}>
                                <TableCell>{row.productkey}</TableCell>
                                <TableCell align="left">{row.productname}</TableCell>
                                <TableCell align="center">
                                    <Grid item xs={12} container direction="row" justify="flex-start" alignItems="center" spacing={0}>
                                        <Grid item xs>
                                            <IconButton onClick={() => { handleDelete(row.productkey) }}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs style={{ textAlign: 'center' }}>
                                            <Typography variant="subtitle1">
                                                {listQuotaPlan.find(f => f.productkey == row.productkey)?.amount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <IconButton onClick={() => { handleAdd(row.productkey) }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(parseInt(row.premium.replace(',', '')))} บาท</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell rowSpan={3} />
                            <TableCell>ราคาร่วมทั้งหมด</TableCell>
                            <TableCell align="right">{currencyFormat(total)} บาท</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>จำนวนงวดที่ผ่อนได้</TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    <FormControl>
                                        <Select
                                            labelId="demo-customized-select-label"
                                            id="demo-customized-select"
                                            value={mouth}
                                            onChange={handleChange}
                                            input={<BootstrapInput />}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                        </Select>
                                    </FormControl>เดือน
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>จำนวนผ่อนต่องวด</TableCell>
                            <TableCell align="right">{currencyFormat(relax(total, mouth))} บาท</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        input: {
            paddingRight: '30px !important',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            padding: '5px 32px 5px 20px',
            marginRight: '5px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
}))

const currencyFormat = (price: number) => {
    return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const relax = (price: number, mouth: number) => {
    return roundTo.up((price / mouth), 0)
}