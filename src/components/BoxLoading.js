import { Box, Skeleton, Typography } from "@mui/material";

const BoxListLoading = () => {
  return(
    <Box sx={{display: "flex"}}>
      <Box>
        <Skeleton variant="rectangular" width={150} height={180} />
      </Box>
      <Box sx={{paddingLeft: "30px"}}>
        <Typography variant="h3" sx={{minWidth: 500}}>
          <Skeleton />
        </Typography>
        <Typography variant="text">
          <Skeleton />
        </Typography>
        <Typography variant="text">
          <Skeleton />
        </Typography>
        <Typography variant="text">
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  )
}

export default BoxListLoading;