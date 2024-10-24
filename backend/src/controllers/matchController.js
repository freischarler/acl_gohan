import matchService from '../services/matchService.js';
import teamService from '../services/teamService.js';
import userService from '../services/userService.js';

class MatchController {
  async createMatch(req, res, next) {
    try {
      const match = await matchService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getMatchById(req, res, next) {
    try {
      const match = await matchService.getMatchById(req.params.id);
      res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async getAllMatches(req, res, next) {
    try {
      const matchs = await matchService.getAllMatchs();
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  }

  async getMatchesByEvent(req, res, next) {
    try {
      const matchs = await matchService.getMatchesByEvent(req.params.eventId);

      //search user1_id and reemplaze for user1 name
      for (let i = 0; i < matchs.length; i++) {
        matchs.user1 = await userService.getUserById(matchs[i].user1_id);
        //reemplace user1_id for user1 name
        delete matchs[i].dataValues.user1_id;
        matchs.user2 = await userService.getUserById(matchs[i].user2_id);
        delete matchs[i].dataValues.user2_id;

        matchs.team1 = await teamService.getTeamById(matchs[i].team1_id);
        delete matchs[i].dataValues.team1_id;

        matchs.team2 = await teamService.getTeamById(matchs[i].team2_id);
        delete matchs[i].dataValues.team2_id;


        matchs[i].dataValues.user1 = { name: matchs.user1.name, user_id: matchs.user1.user_id }
        matchs[i].dataValues.user2 = { name: matchs.user2.name, user_id: matchs.user2.user_id }
        matchs[i].dataValues.team1 = { name: matchs.team1.name, team_id: matchs.team1.team_id }
        matchs[i].dataValues.team2 = { name: matchs.team2.name, team_id: matchs.team2.team_id }

      };
      
      console.log(matchs)
      
      res.status(200).json(matchs);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async updateMatch(req, res, next) {
    try {
      const match = await matchService.updateMatch(req.params.id, req.body);
      res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async deleteMatch(req, res, next) {
    try {
      await matchService.deleteMatch(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new MatchController();
