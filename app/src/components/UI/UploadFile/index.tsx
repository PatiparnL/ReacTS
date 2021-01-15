import React, { useState } from 'react';
import {
    Grid
    , TextField
    , Button,
    IconButton
} from '@material-ui/core';
import { DropzoneDialogBase, FileObject } from 'material-ui-dropzone';

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    label: string;
    xs: any;
    sm: any;
    selectedFile: (fileObject: FileObject | undefined) => void;
}

export const UploadFile: React.FC<Props> = ({ label, xs, sm, selectedFile }) => {

    const [open, setOpen] = useState(false);
    const [fileObjects, setFileObjects] = React.useState<FileObject[]>([]);
    const [fileName, setFileName] = React.useState('');
    const [fileData, setFileData] = React.useState<string | ArrayBuffer | null>(null);

    const onDeleteFile = () => {
        setFileObjects([]);
        setFileName('');
        setFileData(null);
    }

    return (<Grid container spacing={2}>
        <Grid item xs={xs} sm={sm}>
            <TextField
                id=""
                label={label}
                size="small"
                disabled={true}
                variant="outlined"
                fullWidth
                value={fileName}
                InputProps={{
                    endAdornment:
                        <>
                            {
                                fileName !== ''
                                    ? <IconButton
                                        size="small"
                                        color="secondary"
                                        onClick={onDeleteFile}><DeleteIcon /></IconButton>
                                    : null
                            }
                            {
                                fileObjects.length > 0
                                    ? <CheckCircleOutlineIcon style={{ color: '#4aedc4', margin: '5px' }} />
                                    : < IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => setOpen(true)}><OpenInBrowserIcon /></IconButton>
                            }
                        </>
                }} />
            <DropzoneDialogBase
                acceptedFiles={['image/*']}
                fileObjects={fileObjects}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                filesLimit={1}
                maxFileSize={5000000}
                open={open}
                onClose={() => setOpen(false)}
                onAdd={(newFileObjs: FileObject[]) => {
                    setFileObjects(newFileObjs);
                }}
                onSave={(files) => {
                    let fileObject = [...fileObjects].shift();
                    selectedFile(fileObject);
                    setFileData(prev => fileObject ? fileObject.data : prev);
                    setFileName(prev => fileObject ? fileObject.file.name : prev);
                    setOpen(false);
                }}
                onDelete={deleteFileObj => {
                    setFileObjects([]);
                }}
                showPreviews={false}
                showPreviewsInDropzone={true}
                showFileNames={true}
            />
        </Grid>
    </Grid>)
}