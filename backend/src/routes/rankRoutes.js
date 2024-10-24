import express from 'express';
import rankController from '../controllers/rankController.js';

const router = express.Router();

router.get('/:year/individuals', (req, res, next) => rankController.getIndividualsRank(req, res, next));
router.get('/:year/teams', (req, res, next) => rankController.getTeamsRank(req, res, next));

export default router;