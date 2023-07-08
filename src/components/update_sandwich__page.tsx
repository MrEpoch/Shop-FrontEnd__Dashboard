import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CreateSandwich } from '../API_Requests';
import { Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [open_update, setOpen_update] = useState(false);
  const [image_sandwich, setImage_sandwich] = useState<null | File>(null);
  const [error, setError] = useState<string>("");
  const [chosen_sandwich, setChosen_sandwich] = useState({});

  
  const [sandwich_value, setSandwich_value] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSandwich = () => {
    try {
        if (image_sandwich === null) { setError("Image cannot be empty"); return; }
        if (name.trim() === "" || description.trim() === "" || price === "0") { setError("Values are empty"); return; }
        CreateSandwich(name, description, price, image_sandwich);
        setOpen(false);
    } catch (e) {
        console.log(e);
        setError("Something went wrong");
        return;
    }
  };

  const handle_sandwich_change = () => {
    try {
        if (sandwich_value === "") { setError("Sandwich cannot be empty"); return; }
        setChosen_sandwich(sandwich_value);
        setOpen(false);
        setOpen_update(true);
    } catch (e) {
        console.log(e);
        setError("Something went wrong");
    }
  }



  return (
    <div className='level-item has-text-centered'>
      <Button variant="outlined" className="main-button__color " onClick={handleClickOpen}>
        Update sandwich
      </Button>
      {error !== "" ? (<Alert severity="error" className="error__auth">{error}</Alert>) : (<></>)}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose sandwich to update</DialogTitle>
        <DialogContent>
             <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={sandwich_value}
                onChange={handle_sandwich_change}
                label="sandwich"
                inputProps={{
                  name: 'sandwich',
                  id: 'sandwich',
                }}
              >
                {props.sandwiches.map((sandwich: any, index: number) => (
                    <MenuItem key={index} value={sandwich.id}>{sandwich.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {chosen_sandwich && 
                (<div>
                    <TextField autoFocus margin="dense" id="name" label="Sandwich name" fullWidth variant="standard" value={chosen_sandwich.name} onChange={(e: any) => setName(e.target.value)} />
                    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </div>)
            }
        </DialogContent>
      </Dialog>
    </div>
  );
}
