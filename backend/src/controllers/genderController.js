import genderService from "../services/genderService.js";

class GenderController {
    async createGender(req, res, next) {
        try {
            const gender = await genderService.createGender(req.body);
            res.status(201).json(gender);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getGenderById(req, res, next) {
        try {
            const gender = await genderService.getGenderById(req.params.id);
            res.status(200).json(gender);
        } catch (error) {
            next(error);
        }
    }

    async getAllGenders(req, res, next) {
        try {
            const genders = await genderService.getAllGenders();
            res.status(200).json(genders);
        } catch (error) {
            next(error);
        }
    }

    async updateGender(req, res, next) {
        try {
            const gender = await genderService.updateGender(req.params.id, req.body);
            res.status(200).json(gender);
        } catch (error) {
            next(error);
        }
    }

    async deleteGender(req, res, next) {
        try {
            await genderService.deleteGender(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new GenderController();