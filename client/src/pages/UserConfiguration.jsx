import { useState, useEffect } from 'react';
import { updateUser, updateUserPassword } from '../services/api';
import { TextField, Button, Container, Grid, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Country } from 'country-state-city';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { Alert } from '@mui/material';

export const UserConfiguration = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [userD, setUserD] = useState({
        name: '',
        country: '',
        city: '',
        address: '',
        email: '',
        team_id: '',
        phone: '',
        gender_id: '',
        born: '',
        url_image: '',
        password: ''
    });
    const [countries, setCountries] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(user != null) return;
        setUserD(user);
          

        // Fetch all countries
        const allCountries = Country.getAllCountries();
        setCountries(allCountries);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserD(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userD);
        console.log(userD.user_id);
        updateUser(userD, userD.user_id)
            .then(response => {
                console.log('User updated successfully', response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (newPassword === currentPassword) {
            setError("La nueva contraseña no puede ser igual a la antigua");
            return;
        }


        setUserD(prevState => ({
            ...prevState,
            old_password: currentPassword,
            password_new: newPassword
        }));


        let userBody = {
            old_password: currentPassword,
            password_new: newPassword
        }

        updateUserPassword(userBody, user.user_id)
            .then(response => {
                console.log('User updated successfully', response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
        
        handleClose();
    };

    return (
        <>
            {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" onClose={() => setSuccess(null)}>
                    {success}
                </Alert>
            )}
            
        <Container sx={{mt:2}}  className='fade-in'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Country</InputLabel>
                            <Select
                                name="country"
                                value={user.country}
                                onChange={handleChange}
                            >
                                {countries.map(country => (
                                    <MenuItem key={country.isoCode} value={country.name}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                                fullWidth
                                label="Ciudad"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Gender ID"
                            name="gender_id"
                            value={user.gender_id}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Born"
                            name="born"
                            type="date"
                            value={userD.born ? userD.born.split('T')[0] : ''}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="URL Image"
                            name="url_image"
                            value={user.url_image}
                            onChange={handleChange}
                        />
                    </Grid>

                    
                    <Grid container spacing={2} sx={{mt: 2}}>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Guardar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="secondary" onClick={handleOpen} fullWidth>
                                Cambiar contraseña
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cambiar contraseña</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Antigüa contraseña"
                        type="password"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        margin="dense"
                        label="Nueva contraseña"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        margin="dense"
                        label="Repetir nueva contraseña"
                        type="password"
                        fullWidth
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handlePasswordChange} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
        </>
    );
};