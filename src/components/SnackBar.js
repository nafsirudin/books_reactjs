import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackBar = (props) => {
  return (
    <>
      <Snackbar
        open={props.snackbarConfig.open}
        autoHideDuration={3000}
        message={props.snackbarConfig.message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        onClose={props.handleCloseSnackbar}
        >
          <Alert onClose={props.handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {props.snackbarConfig.message}
          </Alert>
        </Snackbar>
    </>
  )
}

export default SnackBar