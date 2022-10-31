import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Box, Button, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { React, useRef, useState } from 'react';
import { db, storage } from '../configs/firebase';
import { v4 } from 'uuid';
import SnackBar from './SnackBar';

const Form = (props) => {
  const [loading, setLoading] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    status: ''
  });
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState('');
  const [imageCover, setImageCover] = useState(null);
  const [status, setStatus] = useState('draft');

  const inputRef = useRef(null);

  dayjs.extend(utc);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  }

  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(imageCover==null){
      alert('File tidak boleh kosong!');
      setLoading(false);
      return;
    }
    //? upload image ke firebase storage
    const filename = v4();
    const imageRef = ref(storage, `images_cover/${filename}`);
    await uploadBytes(imageRef, imageCover);
    const url = await getDownloadURL(imageRef);
    const data = {
      date: date.toString(),
      title: title,
      description: description,
      image_cover: filename,
      image_cover_url: url,
      status: status
    }
    setLoading(true)
    await addDoc(collection(db, "books"), data).then(()=>{
      setLoading(false)
    });
    setTitle('');
    setDate(dayjs());
    setDescription('');
    setStatus('draft');
    setImageCover(null);
    inputRef.current.value = null;
    props.fetchData();

    setSnackbarConfig({
      open: true,
      message: 'Saved successfully',
      status: 'success'
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbarConfig({
      open: false,
      message: '',
      status: ''
    });
  }

  return (
    <Box>
      <form onSubmit={handleAdd}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={(newValue) => {
                setDate(dayjs(newValue).utc());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField id="title" label="Title" variant="outlined" value={title} onChange={(e) => {setTitle(e.target.value)}} />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField id="description" label="Description" variant="outlined" multiline rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}} />
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <input type="file" onChange={(e)=>{setImageCover(e.target.files[0])}} ref={inputRef} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                value={status}
                onChange={handleChangeStatus}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{display: "flex"}}>
          <Button type="submit" variant="contained" endIcon={<NoteAddIcon />}>
            Send
          </Button>
        </Box>
      </form>
      {
        loading?(
          <Box sx={{ width: '100%', marginTop: "30px" }}>
            <LinearProgress />
          </Box>
        ):(<></>)
      }
      <SnackBar snackbarConfig={snackbarConfig} handleCloseSnackbar={handleCloseSnackbar} />
    </Box>
  )
}

export default Form;