import { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ranking } from '../data/data.js';
import RankAthletes from './RankAthletes.jsx';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const [data, setData] = useState([]);

    useEffect(() => {
        /*getRanking()
            .then(response => {
                // Actualizar el estado con los datos obtenidos
                console.log(response.data)
                //setData(response.data);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });*/

            setData(ranking)
    }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{ bgcolor: '#13354a' }} // Add this line
        >
          <Tab label="SCHOOL" {...a11yProps(0)} />
          <Tab label="INDIVIDUAL" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Record</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Previous</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((team, index) => (
                        <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{team.team}</TableCell>
                        <TableCell>{team.record}</TableCell>
                        <TableCell>{team.points}</TableCell>
                        <TableCell>{team.previous}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </TabPanel>
        
        <TabPanel value={value} index={1} dir={theme.direction}>
          <RankAthletes />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
