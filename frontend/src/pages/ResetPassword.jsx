import { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { postResetPassword } from '../services/api';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setSuccess(null);
      return;
    }
    // Handle password reset logic here
    postResetPassword(token, password)
      .then(r => {
        if (r.status === 200) {
          setError(null);
          setSuccess('La contraseña se ha restablecido correctamente');
          setTimeout(() => navigate('/login', { replace: true }), 3000); // Redirect to login after 3 seconds
        } else {
          setError('Error al restablecer la contraseña');
        }
      })
      .catch(err => {
        setError('Error resetting password: ' + err.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cambiar contraseña
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cambiar contraseña
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ResetPassword;