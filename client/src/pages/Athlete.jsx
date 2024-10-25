

import { Button, Grid, Typography, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const Athlete = () => {
  const navigate = useNavigate();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Name Surname
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Athlete
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Avatar 
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 60, height: 60 }} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" gutterBottom>
            United States of America
          </Typography>
          <Typography variant="body1" align="center">
            USA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" align="center">
            Born: 01/01/1990
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Box>
  );
}