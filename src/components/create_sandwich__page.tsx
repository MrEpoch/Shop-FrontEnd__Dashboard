import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { CreateSandwich } from '../API_Requests';
import { Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [image_sandwich, setImage_sandwich] = useState<null | File>(null);
  const [error, setError] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stripeId, setStripeId] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSandwich = async () => {
    try {
        if (image_sandwich === null) { setError("Image cannot be empty"); return; }
        if (name.trim() === "" || description.trim() === "" || price === 0) { setError("Values are empty"); return; }
        await CreateSandwich(name, description, price, image_sandwich, stripeId);
        setOpen(false);
    } catch (e) {
        console.log(e);
        setError("Something went wrong");
        return;
    }
  };


  return (
    <div className='level-item has-text-centered'>
      <Button variant="outlined" className="main-button__color " onClick={handleClickOpen}>
        Add new Sandwich
      </Button>
      {error !== "" ? (<Alert severity="error" className="error__auth">{error}</Alert>) : (<></>)}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create sandwich</DialogTitle>
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
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Sandwich description"
            type="text"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Sandwich price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="stripe_id"
            label="Stripe price id"
            onChange={(e) => setStripeId(e.target.value)}
            type="password"
            fullWidth
            variant="standard"
          />
        <div className="file is-primary" style={{ gap: "2rem" }}>
          {image_sandwich !== null ? (<p className="file-name">{image_sandwich.name}</p>) : (<></>)}
          <label className="file-label">
            <input  className="file-input" type="file" name="sandwich" onChange={(e) => {
                if (e.target.files === null) { setError("Image cannot be empty"); return; }
                setImage_sandwich(e.target.files[0])}
            }
            />
            <span className="file-cta">
              <span className="file-icon">
                <CloudUploadIcon />
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
          <Button onClick={handleAddSandwich}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
