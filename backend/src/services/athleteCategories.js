import AthleteCategory from '../models/athleteCategories.js';
import  ApiError from '../utils/ApiError.js';


class AthleteCategoryService {
    async createAthleteCategory(athleteCategoryData) {
        return AthleteCategory.create(athleteCategoryData);
    }

    async getAllAthleteCategories() {
        return await AthleteCategory.find();
    }

    async getAthleteCategoryById(categoryId) {
        const category = await AthleteCategory.findByPk(categoryId);
        if (!category) {
        throw new ApiError(404, 'Category not found');
        }
        return category;
    }

    async getAthleteCategoryByAthlete(athleteId) {
        return AthleteCategory.findAll({ where: { athlete_id: athleteId } });
    }
}


export default new AthleteCategoryService();