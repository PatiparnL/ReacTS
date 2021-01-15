import React, { ChangeEvent, useEffect, useState } from 'react';
import { DropdownData, Field } from '../type';
import { MenuItem, Select, TextField, FormControl, InputLabel, Typography } from '@material-ui/core';
import { UploadFile } from '../../../UI';
import { FileObject } from 'material-ui-dropzone';

interface ElementProp {
    field: Field;
    changedValue?: (value: any) => void;
    selectedFile?: (fileObject: FileObject | undefined) => void;
}

export const Element: React.FC<ElementProp> = ({ field, changedValue, selectedFile }) => {

    const [dropdownData, setDropdownData] = useState<DropdownData[]>();

    useEffect(() => {
        if (field.dropdownApi) {
            //Call api
        } else {
            setDropdownData(field.dropdownData)
        }
    }, [field])

    switch (field.elementType) {
        case "dropdown":
            return <FormControl
                fullWidth={field.fullWidth} style={field.width !== 0 ? { width: field.width } : {}}
                size="small"
                variant="outlined">
                <InputLabel>{field.lable}</InputLabel>
                <Select
                    name={field.name}
                    label={field.lable}
                    readOnly={field.readOnly}
                    onChange={(e) => {
                        if (changedValue)
                            changedValue(e.target.value)
                    }}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        dropdownData
                            ? dropdownData.map(data => (<MenuItem value={data.value}>{data.text}</MenuItem>))
                            : null
                    }
                </Select>
            </FormControl>
        case "uploadFile":
            return <UploadFile
                label={field.lable}
                xs={field.xs}
                sm={field.sm}
                selectedFile={(fileObject: FileObject | undefined) => {
                    if (selectedFile)
                        selectedFile(fileObject);
                }} />
        case "typography":
            return <Typography variant="subtitle1" key={field.name}>
                {field.lable}
            </Typography>
        case null:
            return null
        default:
            return <TextField
                size="small"
                variant="outlined"
                name={field.name}
                InputProps={{ readOnly: field.readOnly, }}
                label={field.lable}
                fullWidth={field.fullWidth}
                onChange={(e) => {
                    if (changedValue)
                        changedValue(e.target.value)
                }} />
    }
}