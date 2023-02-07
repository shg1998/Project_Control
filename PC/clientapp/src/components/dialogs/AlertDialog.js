import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                {props.buttonContent}
            </Button> */}
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'آیا مطمئنید؟🤔'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">آیا از حذف این آیتم اطمینان دارید؟</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>نه🥲</Button>
                    <Button onClick={props.onYesBtnClicked}>بله😎</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
