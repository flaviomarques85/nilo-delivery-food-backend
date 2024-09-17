const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.get('/', (req, res) => {
    try {
        res.status(200).json({ mensage: "healthcheck sucesso" })
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;