import { Box, Chip, CircularProgress, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import moment from 'moment/moment';

const ListBook = (props) => {
  const date = props.book.data().date;
  return (
    <Box sx={{display: "flex", marginBottom: "30px", borderBottom: "solid 1px", maxWidth: "100%"}}>
      {props.idDelete===props.book.id ? props.loadingProgress?(<CircularProgress />):(<></>): (<></>)}
      <Box sx={{maxWidth: "150px"}}>
        <img className='imgShadow' width="100%" height="auto" src={props.book.data().image_cover_url} alt={props.book.data().title} />
      </Box>
      <Box sx={{paddingLeft: "30px"}}>
        <div style={{display: "flex", gap: 10}}>
          <Stack direction="row" spacing={1}>
            <Chip label={props.book.data().status.toUpperCase()} color="success" sx={{fontSize: "8px"}}/>
            <Chip label={moment(date).format('DD MMMM YYYY')} />
          </Stack>
        </div>
        <h1>{props.book.data().title}</h1>
        <p>{props.book.data().description}</p>
        <Box sx={{display: "flext", textAlign: "end"}}>
          <IconButton aria-label="delete" color="error" onClick={()=> { if (window.confirm(`Are you sure you wish to delete this book with title ${props.book.data().title}?`)) props.handleDelete(props.book.id, props.book.data().image_cover) }}>
            <DeleteIcon sx={{fontSize: "20px !important"}} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ListBook;