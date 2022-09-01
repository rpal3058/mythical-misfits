const express = require('express');

const userActions = require('./mythicalMisfitsAction.js');

const router = express.Router();

router.post('/', userActions.healthCheck);

router.post('/mysfits', userActions.getMisfits);

module.exports = router;