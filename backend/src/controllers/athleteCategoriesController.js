import AthleteCategoryService from "../services/athleteCategories.js";

class AthleteCategoriesController {
    async createAthleteCategories(req, res, next) {
        try {
        const athleteCategories = await AthleteCategoryService.createAthleteCategories(req.body);
        res.status(201).json(athleteCategories);
        } catch (error) {
        console.log(error)
        next(error);
        }
    }
    
    async getAthleteCategoriesById(req, res, next) {
        try {
        const athleteCategories = await AthleteCategoryService.getAthleteCategoriesById(req.params.id);
        res.status(200).json(athleteCategories);
        } catch (error) {
        next(error);
        }
    }
    
    async getAllAthleteCategoriess(req, res, next) {
        try {
        const athleteCategoriess = await AthleteCategoryService.getAllAthleteCategoriess();
        res.status(200).json(athleteCategoriess);
        } catch (error) {
        next(error);
        }
    }
    
    async updateAthleteCategories(req, res, next) {
        try {
        const athleteCategories = await AthleteCategoryService.updateAthleteCategories(req.params.id, req.body);
        res.status(200).json(athleteCategories);
        } catch (error) {
        next(error);
        }
    }
    
    async deleteAthleteCategories(req, res, next) {
        try {
        await AthleteCategoryService.deleteAthleteCategories(req.params.id);
        res.status(204).send();
        } catch (error) {
        next(error);
        }
    }
    
    async getAthleteCategoriesByAthletes(req, res, next) {
        try {
        const athletes = await AthleteCategoryService.getAthleteCategoriesByAthletes(req.params.id);
        res.status(200).json(athletes);
        } catch (error) {
        console.log(error)
        next(error);
        }
    }
    }

export default new AthleteCategoriesController();
