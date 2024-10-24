import eventService from '../services/eventService.js';
import matchService from '../services/matchService.js';
import userService from '../services/userService.js';
import teamService from '../services/teamService.js';

class RankController {
    async getIndividualsRank(req, res, next) {
        try {
            const year = req.params.year;
            // First get all events in the year
            const events = await eventService.getEventsByYear(year);
            // Then get all matches of the events
            const matches = await matchService.getMatchesByEvents(events);

            // Initialize an empty object to store points for each user
            const userPoints = {};

            // Iterate through the matches and accumulate points for each winner
            for (const match of matches) {
                const winnerId = match.winner_id;
                const winnerPoints = match.winner_points;
                const teamId = match.team1_id; // Assuming team1_id is the winner's team

                if (!userPoints[winnerId]) {
                    userPoints[winnerId] = {
                        points: 0,
                        team_id: teamId
                    };
                }

                userPoints[winnerId].points += winnerPoints;
            }

            // Convert the accumulated points object into an array of objects
            const rank = [];
            for (const userId in userPoints) {
                const user = await userService.getUserById(userId);
                rank.push({
                    user_id: userId,
                    user: user.name,
                    points: userPoints[userId].points,
                    team_id: userPoints[userId].team_id
                });
            }

            // Sort the array based on points in descending order
            rank.sort((a, b) => b.points - a.points);

            res.status(200).json(rank);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getTeamsRank(req, res, next) {
        try {
            const year = req.params.year;
            // First get all events in the year
            const events = await eventService.getEventsByYear(year);
            // Then get all matches of the events
            const matches = await matchService.getMatchesByEvents(events);

            // Initialize an empty object to store points and record for each team
            const teamPoints = {};

            //console.log(matches)
            // Iterate through the matches and accumulate points and record for each team
            for (const match of matches) {
                const winnerId = match.winner_id;
                const winnerPoints = match.winner_points;
            
                // Determine the winner team based on the winner_id
                let winnerTeamId;
                let loserTeamId;
                if (winnerId === match.user1_id) {
                    winnerTeamId = match.team1_id;
                    loserTeamId = match.team2_id;
                } else if (winnerId === match.user2_id) {
                    winnerTeamId = match.team2_id;
                    loserTeamId = match.team1_id;
                }
            
                if (!teamPoints[winnerTeamId]) {
                    teamPoints[winnerTeamId] = {
                        points: 0,
                        wins: 0,
                        losses: 0
                    };
                }
            
                if (!teamPoints[loserTeamId]) {
                    teamPoints[loserTeamId] = {
                        points: 0,
                        wins: 0,
                        losses: 0
                    };
                }
            
                teamPoints[winnerTeamId].points += winnerPoints;
                teamPoints[winnerTeamId].wins += 1;
                teamPoints[loserTeamId].losses += 1;
            }

            // Convert the accumulated points object into an array of objects
            const rank = [];
            for (const teamId in teamPoints) {
                const team = await teamService.getTeamById(teamId);
                rank.push({
                    team_id: teamId,
                    team: team.name,
                    points: teamPoints[teamId].points,
                    record: `${teamPoints[teamId].wins}-${teamPoints[teamId].losses}`
                });
            }

            // Sort the array based on points in descending order
            rank.sort((a, b) => b.points - a.points);

            res.status(200).json(rank);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new RankController();