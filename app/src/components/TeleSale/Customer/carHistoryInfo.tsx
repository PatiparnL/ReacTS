import { Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'
import { useStylesTeleSale } from '../styles';


interface Props { }

export const CarHistoryInfo: React.FC<Props> = () => {

    const css = useStylesTeleSale();
    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Card style={{ marginTop: 20 }}>
                <CardHeader
                    title="ข้อมูลประวัติการขับขี่/ใช้รถ"
                    titleTypographyProps={{ variant: "h6" }}
                    className={css.cardHeader} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ประสบการณ์การขับรถ</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="1" control={<Radio size="small" color="secondary" />} label="ไม่ถึง 1 ปี" />
                                    <FormControlLabel value="2" control={<Radio size="small" color="secondary" />} label="1 - 3 ปี" />
                                    <FormControlLabel value="3" control={<Radio size="small" color="secondary" />} label="3 - 5 ปี" />
                                    <FormControlLabel value="4" control={<Radio size="small" color="secondary" />} label="มากกว่า 5 ปี" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ลักษณะการใช้รถ</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1">
                                    <FormControlLabel value="0" control={<Radio size="small" color="secondary" />} label="ใช้ทั่วไปในชีวิตประจำวัน(ทำงาน/เรียน)" />
                                    <FormControlLabel value="1" control={<Radio size="small" color="secondary" />} label="ใช้ประกอบการทำงาน(รับ-ส่งของ)" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ปีที่ผ่านมาเกิดอุบัติเหตุหรือไม่</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="1" control={<Radio size="small" color="secondary" />} label="ไม่มี" />
                                    <FormControlLabel value="2" control={<Radio size="small" color="secondary" />} label="1 - 3 ครั้ง" />
                                    <FormControlLabel value="3" control={<Radio size="small" color="secondary" />} label="มากกว่า 3 ครั้ง" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ความถี่ในการใช้รถ</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="1" control={<Radio size="small" color="secondary" />} label="ทุกวัน" />
                                    <FormControlLabel value="2" control={<Radio size="small" color="secondary" />} label="น้อยกว่า 5 วัน/สัปดาห์" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">ปัจจุบันรถคันนี้ทำ Finance หรือไม่</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="1" control={<Radio size="small" color="secondary" />} label="ไม่ทำ" />
                                    <FormControlLabel value="2" control={<Radio size="small" color="secondary" />} label="ทำ" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}