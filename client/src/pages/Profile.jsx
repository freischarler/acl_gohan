import { Grid, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import QRCode from 'qrcode.react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';



export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formattedDate, setFormattedDate] = useState('');
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState('')

  useEffect(() => {
    setFormattedDate(format(new Date('1990-01-01T00:00:00.000Z'), 'dd-MM-yyyy'));
    setQrValue(`https://www.aclweb.org`+`?i=${user.user_id}&s=${user.name}`);
}, [navigate, user]);


  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}  className='fade-in'>
      <Typography variant="h3" align="center" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Athlete
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        {/*<Grid item xs={12} sm={4}>
          <Avatar 
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 60, height: 60 }} 
          />
        </Grid>*/}
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Pais: {user.country}
          </Typography>
          <Typography variant="body1" align="center">
            Equipo: {user.team}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" align="center" gutterBottom>
            <QRCode value={qrValue} />
          </Typography>
          <Typography variant="body1" align="center">
            Fecha nacimiento: {formattedDate}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}