import   Coach from '../models/coach.js';
import  ApiError from '../utils/ApiError.js';

class CoachService {
  async getCoachById(teamId) {
    const coach = await Coach.findByPk(coachId);
    if (!coach) {
      throw new ApiError(404, 'Coach not found');
    }
    return coach;
  }
}

export default new CoachService();
