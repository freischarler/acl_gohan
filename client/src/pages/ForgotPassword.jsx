import { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Alert } from '@mui/material';
import { postForgotPassword } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email address');
      setSuccess(null);
      return;
    }
    // Handle email submission logic here
    postForgotPassword(email)
    .then(r => {
      if (r.status === 200) {
        setError(null);
        setSuccess('Link de recuperación enviado a tu correo');
      } else {
        setError('Error sending reset link');
      }
    })
    .catch(err => {
      setError('Error sending reset link' + err.message);
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Resetear contraseña
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Enviar link de recuperación
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => navigate('/login')} variant="text" fullWidth>
              Regresar al login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

