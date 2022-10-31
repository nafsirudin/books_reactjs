import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import ListBook from '../components/ListBook';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, storage } from '../configs/firebase';
import { deleteObject, ref } from 'firebase/storage';
import BoxListLoading from '../components/BoxLoading';
import SnackBar from '../components/SnackBar';

const Book = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] =useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    status: ''
  });
  const [idDelete, setIdDelete] = useState(false);
  const fetchData = async () => {
    await getDocs(collection(db, "books")).then((response)=>{
      const resultData = response.docs.sort((a,b)=>{
        return a.data().date - b.data().date;
      }).reverse();
      setData(resultData);
      setLoading(false);
    });
  }

  const handleDelete = async (id, image) => {
    setIdDelete(id);
    try {
      setLoadingProgress(true);
      const desertRef =  ref(storage, `images_cover/${image}`);
      await deleteObject(desertRef);
    } catch (error) {
      Promise.resolve(false)
    }
    await deleteDoc(doc(db, "books", id)).then(()=>{
      setLoadingProgress(false);
    });
    fetchData();
    setSnackbarConfig({
      open: true,
      message: 'Successfully deleted',
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

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Box sx={{marginTop: "100px", display: "flex", gap: 2, justifyContent: "center", flexDirection: "column", flexWrap: "wrap"}}>
      <Box>
        <Form fetchData={fetchData} />
      </Box>
      <hr />
      <SnackBar snackbarConfig={snackbarConfig} handleCloseSnackbar={handleCloseSnackbar} />
      <Box>
        { loading?(
          <BoxListLoading />
        ):(
          data.map((item)=>{
            return(
              <ListBook key={item.id} book={item} handleDelete={handleDelete} loadingProgress={loadingProgress} idDelete={idDelete}/>
            )
          })
          )
        }
      </Box>
    </Box>
  )
}

export default Book;