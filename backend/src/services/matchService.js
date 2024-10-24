import   Match  from '../models/match.js';
import  ApiError from '../utils/ApiError.js';

class MatchService {
  async createMatch(matchData) {
    return Match.create(matchData);
  }

  async getMatchById(matchId) {
    const match = await Match.findByPk(matchId);
    if (!match) {
      throw new ApiError(404, 'Match not found');
    }
    return match;
  }

  async getAllMatchs() {
    return Match.findAll();
  }

  async getMatchesByEvent(event_id) {
    return Match.findAll({ where: { event_id } });
  }

  async getMatchesByEvents(events) {
    const eventIds = events.map((event) => event.event_id);
    return Match.findAll({ where: { event_id: eventIds } });
  }

  async updateMatch(matchId, matchData) {
    const match = await Match.findByPk(matchId);
    if (!match) {
      throw new ApiError(404, 'Match not found');
    }
    await match.update(matchData);
    return match;
  }

  async deleteMatch(matchId) {
    const match = await Match.findByPk(matchId);
    if (!match) {
      throw new ApiError(404, 'Match not found');
    }
    await match.destroy();
    return match;
  }
}

export default new MatchService();
