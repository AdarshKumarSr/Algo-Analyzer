const express = require('express');
const router = express.Router();
const {getAllAlgorithms, getAlgorithmBySlug, visualizeAlgorithm, getAlgorithmCode} = require('../controllers/algorithmController');

router.get('/', getAllAlgorithms);
router.post('/:slug/visualize', visualizeAlgorithm)
router.get('/:slug/code', getAlgorithmCode);
router.get('/:slug', getAlgorithmBySlug);

module.exports = router;