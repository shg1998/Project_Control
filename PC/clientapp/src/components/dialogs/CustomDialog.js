import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CustomDialog(props) {
    return (
        <React.Fragment>
            <Dialog fullWidth={true} maxWidth={props.maxWidth} open={props.open} onClose={props.handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 'medium' }}>{props.title}</DialogTitle>
                <DialogContent>{props.children}</DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>لغو</Button>
                    <Button onClick={props.handleSubmit}>ثبت</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
