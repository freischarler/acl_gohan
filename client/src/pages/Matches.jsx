import { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Select, MenuItem } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { getAllMatches } from '../services/api';
import { WinByOptions } from '../data/data';

export const Matches = () => {
  const location = useLocation();
  const event = location.state;
  console.log(event);

  const [matches, setMatches] = useState([]);
  const [editCell, setEditCell] = useState({ row: null, column: null });

  useEffect(() => {
    getAllMatches(event.event_id)
      .then(response => {
        console.log(response.data);
        setMatches(response.data);
      })
      .catch(error => console.log(error));
  }, [event]);

  const handleInputChange = (e, matchIndex, field) => {
    const { value } = e.target;
    setMatches(prevMatches => {
      const updatedMatches = [...prevMatches];
      updatedMatches[matchIndex][field] = value;

      if (field === 'win_by') {
        const winByOption = WinByOptions.find(option => option.value === value);
        if (winByOption) {
          updatedMatches[matchIndex]['winner_points'] = winByOption.winner_poins;
          updatedMatches[matchIndex]['loser_points'] = winByOption.loser_points;
        }
      }

      if (field === 'winner_id') {
        const selectedUser = value === 'user1' ? matches[matchIndex].user1 : matches[matchIndex].user2;
        updatedMatches[matchIndex]['winner_id'] = selectedUser.user_id;
      }

      return updatedMatches;
    });
  };

  const handleCellClick = (row, column) => {
    setEditCell({ row, column });
  };

  const handleSave = (matchIndex) => {
    const match = matches[matchIndex];
    console.log(match)
    /*updateMatchRow(match)
      .then(response => {
        console.log('Row updated successfully', response);
      })
      .catch(error => {
        console.error('Error updating row', error);
      });*/

    setEditCell({ row: null, column: null });
  };

  const handleBlur = () => {
    setEditCell({ row: null, column: null });
  };

  const renderCellContent = (match, i, field) => {
    const value = field.includes('.') ? field.split('.').reduce((o, k) => (o || {})[k], match) : match[field];
    if (editCell.row === i && editCell.column === field) {
      if (field === 'win_by') {
        return (
          <Select
            value={value}
            onChange={(e) => handleInputChange(e, i, field)}
            variant="outlined"
            size="small"
            autoFocus
            onBlur={handleBlur}
          >
            {WinByOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      } else if (field === 'winner_id') {
        return (
          <Select
            value={value}
            onChange={(e) => handleInputChange(e, i, field)}
            variant="outlined"
            size="small"
            autoFocus
            onBlur={handleBlur}
          >
            <MenuItem value="user1">{match.user1.name}</MenuItem>
            <MenuItem value="user2">{match.user2.name}</MenuItem>
          </Select>
        );
      } else {
        return (
          <TextField
            value={value}
            onChange={(e) => handleInputChange(e, i, field)}
            variant="outlined"
            size="small"
            autoFocus
            onBlur={handleBlur}
          />
        );
      }
    }
    return (
      <div onClick={() => handleCellClick(i, field)}>
        {value}
      </div>
    );
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Match ID</TableCell>
              <TableCell>User 1</TableCell>
              <TableCell>User 2</TableCell>
              <TableCell>Team 1</TableCell>
              <TableCell>Team 2</TableCell>
              <TableCell>Points 1</TableCell>
              <TableCell>Points 2</TableCell>
              <TableCell>Win By</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell>Winner Points</TableCell>
              <TableCell>Loser Points</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, i) => (
              <TableRow key={match.match_id}>
                <TableCell>{i}</TableCell>
                <TableCell>{match.user1.name}</TableCell>
                <TableCell>{match.user2.name}</TableCell>
                <TableCell>{match.team1.name}</TableCell>
                <TableCell>{match.team2.name}</TableCell>
                <TableCell>{renderCellContent(match, i, 'points1')}</TableCell>
                <TableCell>{renderCellContent(match, i, 'points2')}</TableCell>
                <TableCell>{renderCellContent(match, i, 'win_by')}</TableCell>
                <TableCell>{renderCellContent(match, i, 'winner_id')}</TableCell>
                <TableCell>{match.winner_points}</TableCell>
                <TableCell>{match.loser_points}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleSave(i)}>
                    <Save />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};