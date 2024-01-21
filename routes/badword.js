const express = require('express');
const router = express.Router();
const badWord = require('../badword.json');

router.get('/', (req, res, next) => {
    try {
        return res.status(200).json(badWord);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/:word', (req, res, next) => {
    try {
        const { word } = req.params;
        const result = badWord.includes(word);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;