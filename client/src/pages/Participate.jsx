import { useEffect, useState } from 'react';
import { Grid, Button, FormControl, Container, Alert, Snackbar, Typography, Box } from '@mui/material';
import { postRegistration } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Participate.css'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

export const Participate = () => {
    const location = useLocation();
    const eventParameters = location.state;
    const { user } = useContext(AuthContext);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [weightOptions, setWeightOptions] = useState([]);
    const [ageOptions, setAgeOptions] = useState([]);
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedAge, setSelectedAge] = useState('');

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [price, setPrice] = useState(0);



    useEffect(() => {
        if (eventParameters.parameters && Array.isArray(eventParameters.parameters)) {
            const flattenedParameters = eventParameters.parameters.reduce((acc, val) => acc.concat(val), []);
            const categories = [...new Set(flattenedParameters.map(param => param.category))];
            setCategoryOptions(categories);
        }

        setPrice(eventParameters.price);
    }, [eventParameters, navigate, user.user_id]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
        setSelectedWeight('');
        setSelectedAge('');

        if (eventParameters.parameters && Array.isArray(eventParameters.parameters)) {
            const flattenedParameters = eventParameters.parameters.reduce((acc, val) => acc.concat(val), []);
            const weights = [...new Set(flattenedParameters
                .filter(param => param.category === selectedCategory)
                .map(param => param.weight))];
            setWeightOptions(weights);
            setAgeOptions([]);
        }
    };

    const handleWeightChange = (event) => {
        const selectedWeight = Number(event.target.value);
        setSelectedWeight(selectedWeight);
        setSelectedAge('');

        if (eventParameters.parameters && Array.isArray(eventParameters.parameters)) {
            const flattenedParameters = eventParameters.parameters.reduce((acc, val) => acc.concat(val), []);
            const ages = [...new Set(flattenedParameters
                .filter(param => param.category === selectedCategory && param.weight === selectedWeight)
                .map(param => param.age))];
            setAgeOptions(ages);
        }
    };

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleBuy = async () => {
        if (!selectedCategory || !selectedWeight || !selectedAge) {
            setAlertMessage('Seleccionar categoria, peso y edad.');
            setOpen(true);
            return;
        }

        const item = {
            user_id: user.user_id,
            event_id: eventParameters.event_id,
            category: selectedCategory,
            style_id: eventParameters.style_id,
            team_id: user.team_id,
            weight: selectedWeight,
            age: selectedAge,
            price: price,
        };
        console.log(item);
        postRegistration(item)
            .then(response => console.log(response))
            .catch(error => {
                const errorMessage = error.response.data.error;
                setAlertMessage(errorMessage);
                setOpen(true);
                console.log(error);
            });
    };

    return (
        <Container
            className='fade-in'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2rem',
            }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <div className="responsive-select">
                            {/*<label htmlFor="category-select">Seleccionar peso</label>*/}
                        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Seleccionar categoría</option>
                            {categoryOptions.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth disabled={!selectedCategory}>
                    <div className="responsive-select">
                        {/*<label htmlFor="category-select">Seleccionar peso</label>*/}
                        <select value={selectedWeight} onChange={handleWeightChange}>
                            <option value="">Seleccionar peso</option>
                            {weightOptions.map(weight => (
                                <option key={weight} value={weight}>{weight}</option>
                            ))}
                        </select>
                    </div>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth disabled={!selectedWeight}>
                        <div className="responsive-select">
                                {/*<label htmlFor="category-select">Seleccionar peso</label>*/}
                            <select value={selectedAge} onChange={handleAgeChange}>
                                <option value="">Seleccionar edad</option>
                                {ageOptions.map(age => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>
                    </FormControl>
                </Grid>
            </Grid>

            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6">Entrada: $ {price}</Typography>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, mt: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleBuy}>
                        Participar
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleBack}>
                        Volver
                    </Button>
                    </Grid>
                </Grid>
            </Box>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};