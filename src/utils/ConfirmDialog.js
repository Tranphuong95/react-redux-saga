import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmDialog({open, title, subTitle, ok, cancle, onOk, onCancle, loading}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>onCancle(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent: "center"}}>
          <Button autoFocus color="secondary" variant="contained" sx={{padding: "8px 24px", margin: "24px 12px 24px 0", minWidth: "9em"}} onClick={()=>onCancle(false)} disabled={loading}>
           {cancle}
          </Button>
          <Button onClick={onOk} variant="contained" sx={{padding: "8px 24px", margin: "24px 0 24px 12px", minWidth: "9em"}} disabled={loading}>{ok}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}