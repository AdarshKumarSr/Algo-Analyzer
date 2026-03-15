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

const algorithmMap = {
  'bubble-sort':    getBubbleSortSteps
}

const visualizeAlgorithm = async (req, res) => {
  try {
    const { slug } = req.params;
    const { input } = req.body;

    const stepGenerator = algorithmMap[slug];
    if (!stepGenerator) {
      return res.status(404).json({ success: false, error: 'Algorithm not found' });
    }

    // each generator validates its own input and throws if invalid
    const steps = stepGenerator(input);

    res.json({ success: true, data: { steps } })
  }
  catch (err) {
    const status = err.isValidationError ? 400 : 500;
    res.status(status).json({ success: false, error: err.message });
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