import { useState, useEffect } from "react";
import { postRegisterUser } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Grid, Select, MenuItem, InputLabel, Alert } from '@mui/material';
import { Country } from 'country-state-city';

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [born, setBorn] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all countries
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    if (!name || !country || !city || !address || !email || !gender || !born || !password || !repeatPassword) {
      setError("Todos los campos son requeridos");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Email invalido");
      return false;
    }
    if (new Date(born) >= new Date()) {
      setError("Fecha de nacimiento incorrecta");
      return false;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setError(null);
    setUrlImage("https://");
    const user = {
      name,
      country,
      city,
      address,
      email,
      phone,
      gender,
      born,
      url_image: urlImage,
      password_hash: password,
    };
    addUser(user);
  };

  const addUser = (user) => {
    setLoading(true);
    console.log(user);
    postRegisterUser(user)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <Container sx={{ mt: '5%' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel id="name-label">Nombre y apellido</InputLabel>
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel id="gender-label">Genero</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              autoComplete="off"
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Fecha de nacimiento</InputLabel>
            <TextField
              type="date"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Pais</InputLabel>
            <Select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              autoComplete="off"
            >
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Ciudad</InputLabel>
            <TextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel>Direccion</InputLabel>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>



            <Grid item xs={12} sm={6} sx={{ mt:'2rem'}}>
              <TextField
                label="Contraseña"
                autoComplete="off"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} sm={6} sx={{ mt:'2rem'}}>
              <TextField
                label="Repetir Contraseña"
                autoComplete="off"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                fullWidth
              />
            </Grid>



          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" onClick={() => navigate(-1)} fullWidth>
              Cancelar
            </Button>
          </Grid>   
        </Grid>  
      </form>
    </Container>
  );
};