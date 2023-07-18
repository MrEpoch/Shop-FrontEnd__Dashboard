import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { UpdateSandwich } from '../API_Requests';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FormDialog(props: any) {
  const [open, setOpen] = useState(false);
  const [image_sandwich, setImage_sandwich] = useState<null | File>(null);
  const [error, setError] = useState<string>("");
  const [chosen_sandwich, setChosen_sandwich] = useState<object | any>({});
  const [is_image, setIs_image] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);


  useMemo(() => {
    if (props && props.sandwiches && props.sandwiches.length > 0) setChosen_sandwich(props.sandwiches[0]);
  }, [props])
 
  const check_validity_sandwich = (chosen: any) => {
    const allKeys = Object.keys(chosen);
    if (allKeys.length === 0) return false;
    if (allKeys.includes("name") && allKeys.includes("description") && allKeys.includes("price") && allKeys.includes("image")) return true;
    return false;
  }

  useMemo(() => {
    if (check_validity_sandwich(chosen_sandwich)) {
        setName(chosen_sandwich.name);
        setDescription(chosen_sandwich.description);
        setPrice(chosen_sandwich.price);
    }
  }, [chosen_sandwich]);


  
  const imageRef = useRef<null | HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handle_update_sandwich = async () => {
    try {
        setError("");
        const old_image_name = chosen_sandwich.image.split("/")[chosen_sandwich.image.split("/").length - 1];
        console.log(name, description, price);
        if (name.trim() === "" || description.trim() === "" || price === 0) { setError("Values are empty"); return; }
        if (is_image && image_sandwich === null) { setError("Image cannot be empty"); return; }
        else if (is_image && image_sandwich !== null) { 
            UpdateSandwich(chosen_sandwich.id, old_image_name, name, description, price, true,image_sandwich);
        } else {
            UpdateSandwich
            await UpdateSandwich(chosen_sandwich.id, old_image_name, name, description, price, false, null);
            setOpen(false);
        }
        setError("");
        setOpen(false);
    } catch (e) {
        console.log(e);
        setError("Something went wrong");
        return;
    }
  };

  const handle_sandwich_change = (e: any) => {
    try {
        console.log(e.target.value);
        setChosen_sandwich(e.target.value);
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
        <DialogTitle>Choose sandwich</DialogTitle>
        <DialogContent>
             <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="sandwich">Sandwich</InputLabel>
              <Select
                autoFocus
                value={Object.keys(chosen_sandwich).length !== 0 ? chosen_sandwich : {}}
                onChange={handle_sandwich_change}
                label="sandwich"
                inputProps={{
                  name: 'sandwich',
                  id: 'sandwich',
                }}
              >
                {props.sandwiches.map((sandwich: any, index: number) => (
                    <MenuItem key={index} value={sandwich}>{sandwich.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
                sx={{ mt: 2 }}
                label="Image"
                control={<Checkbox checked={is_image} onChange={() => setIs_image(prev => !prev)} />}
            />
            {chosen_sandwich && 
                (<div> {check_validity_sandwich(chosen_sandwich) && ( <>  
                    
                    <TextField autoFocus margin="dense" id="name" label="Sandwich name" fullWidth variant="standard" defaultValue={chosen_sandwich.name} onChange={(e: any) => setName(e.target.value)} />
                    <TextField autoFocus margin="dense" id="name" label="Sandwich name" fullWidth variant="standard" defaultValue={chosen_sandwich.description} onChange={(e: any) => setDescription(e.target.value)} />
                    <TextField autoFocus margin="dense" id="name" label="Sandwich name" fullWidth variant="standard" defaultValue={chosen_sandwich.price} onChange={(e: any) => setPrice(parseFloat(e.target.value))} />
                    {is_image &&
                        (
                            <div className="file is-primary" style={{ gap: "2rem" }}>
                              {image_sandwich !== null ? (<p className="file-name">{image_sandwich.name}</p>) : (<></>)}
                              <label className="file-label">
                                <input ref={imageRef}  accept=".jpg, .jpeg, .png" className="file-input" type="file" name="sandwich" onChange={(e) => {
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
                              {image_sandwich !== null ? 
                                (<Button variant="outlined" className="main-button__color " 
                                    onClick={() => { setImage_sandwich(null)
                                        imageRef.current!.value = ""
                                    }}>
                                    Remove image</Button>) : (<></>)}
                            </div>
                        )
                    } </> )}
                </div>)
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handle_update_sandwich}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
