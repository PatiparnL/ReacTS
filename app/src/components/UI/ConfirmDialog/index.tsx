import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface AlertDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    setMainOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmDialog: React.FC<AlertDialogProps> = ({isOpen, title, message, setMainOpen}) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setMainOpen(false);
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                       OK 
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                       Cancel 
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}