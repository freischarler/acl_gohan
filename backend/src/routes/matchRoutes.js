import express from 'express';
import  matchController from '../controllers/matchController.js';

const router = express.Router();

router.post('/', (req, res, next) => matchController.createMatch(req, res, next));
router.get('/:id', (req, res, next) => matchController.getMatchById(req, res, next));
router.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));
router.get('/event/:eventId', (req, res, next) => matchController.getMatchesByEvent(req, res, next));
router.put('/:id', (req, res, next) => matchController.updateMatch(req, res, next));
router.delete('/:id', (req, res, next) => matchController.deleteMatch(req, res, next));

export default router;
