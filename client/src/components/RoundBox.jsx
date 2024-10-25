import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';


export const RoundBox = ({ roundNumber, playerOne, playerTwo, playerOnePoints,playerTwoPoints, winner, winnerBy }) => {
        if (playerOnePoints === undefined) {
          playerOnePoints = 0;
        }
        if (playerTwoPoints === undefined) {
          playerTwoPoints = 0;
        }
        return (
          <>
          <Box display="flex" flexDirection="row" justifyContent="space-between" bgcolor="white" border={1} borderColor="grey.500"  padding={1}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h6">{`Round #${roundNumber}`}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginLeft={2}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{playerOne}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{playerTwo}</Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginLeft={2}>
              <Box display="flex" justifyContent="center" alignItems="center" bgcolor="blue" width={40}>
                <Typography variant="body1" color="white">{playerOnePoints}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" bgcolor="red" width={40}>
                <Typography variant="body1" color="white">{playerTwoPoints}</Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
            { winner || winnerBy && <Typography variant="h9" color="white">Winner {winner} by {winnerBy}</Typography>}
          </Box>
          </>
        );
};

RoundBox.propTypes = {
    roundNumber: PropTypes.number.isRequired,
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    playerOnePoints: PropTypes.number,
    playerTwoPoints: PropTypes.number,
    winner: PropTypes.string,
    winnerBy: PropTypes.string,
};

