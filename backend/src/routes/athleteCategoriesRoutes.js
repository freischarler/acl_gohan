import express from 'express';
import athleteCategoriesController from '../controllers/athleteCategoriesController.js';

const router = express.Router();

router.post('/', (req, res, next) => athleteCategoriesController.createAthleteCategories(req, res, next));
router.get('/:id', (req, res, next) => athleteCategoriesController.getAthleteCategoriesById(req, res, next));
router.get('/athlete/:id', (req, res, next) => athleteCategoriesController.getAthleteCategoriesByAthletes(req, res, next));
router.get('/', (req, res, next) => athleteCategoriesController.getAllAthleteCategoriess(req, res, next));
router.put('/:id', (req, res, next) => athleteCategoriesController.updateAthleteCategories(req, res, next));
router.delete('/:id', (req, res, next) => athleteCategoriesController.deleteAthleteCategories(req, res, next));

export default router;