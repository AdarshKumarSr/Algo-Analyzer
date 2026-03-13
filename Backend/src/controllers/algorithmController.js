const algorithmModel = require('../models/algorithmModel');
const codesModel = require('../models/codesModel');
const { getBubbleSortSteps } = require('../algorithms/array/bubbleSort');

const getAllAlgorithms = async (req, res) => {
    try {
        const algorithms = await algorithmModel.getAll();
        res.json({
            success: true,
            data: algorithms
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const getAlgorithmBySlug = async (req, res) => {
    try {
        const algorithm = await algorithmModel.getBySlug(req.params.slug);

        if (!algorithm) {
            return res.status(404).json({ success: false, error: 'Algorithm Not Found' });
        }

        res.json({ success: true, data: algorithm })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }

}

const visualizeAlgorithm = async (req, res) => {
    try {
        const { slug } = req.params;
        const { input } = req.body;

        if (!input) {
            return res.status(400).json({ success: false, error: 'Pass the Input First' });
        }

        if (!Array.isArray(input)) {
            return res.status(400).json({ success: false, error: 'Input should be in Array' });
        }

        if (input.length === 0) {
            return res.status(400).json({ success: false, error: 'Input should have at least 1 element' });
        }

        if (input.length > 20) {
            return res.status(400).json({ success: false, error: 'Input should not have more than 20 element' });
        }

        if (input.some(val => typeof val !== 'number')) {
            return res.status(400).json({ success: false, error: 'Only Numbers are allowed' });

        }

        // const steps = getBubbleSortSteps(input); 

        const algorithmMap = {
            'bubble-sort': getBubbleSortSteps
        }

        const stepGenerator = algorithmMap[slug];

        if (!stepGenerator) {
            return res.status(404).json({ success: false, error: 'Algorithm not found, try later' });
        }

        const steps = stepGenerator(input);

        res.json({
            success: true,
            data: { steps }
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

const getAlgorithmCode = async (req, res) => {
    try {
        const { slug } = req.params;
        const { lang } = req.query;

        if (!lang) {
            return res.status(404).json({ success: false, error: 'Language is required' });
        }

        if (!['java', 'cpp'].includes(lang)) {
            return res.status(400).json({ success: false, error: 'Language must be java & cpp' });
        }

        const code = await codesModel.getCodeBySlugAndLang(slug, lang);

        if (!code) {
            return res.status(404).json({ success: false, error: 'Code not found' });
        }

        res.json({ success: true, data: code });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

module.exports = { getAllAlgorithms, getAlgorithmBySlug, visualizeAlgorithm, getAlgorithmCode };