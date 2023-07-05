import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Sandwich
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new sandwich</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill sandwich details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sandwich name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sandwich description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sandwich price"
            type="number"
            fullWidth
            variant="standard"
          />
        <div className="file is-primary">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Sandwich Image
              </span>
            </span>
          </label>
        </div>
     </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add new sandwich</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
