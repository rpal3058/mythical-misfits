const express = require('express');

const misfitsActions = require('./mythicalMisfitsAction.js');

const router = express.Router();

router.get('/', misfitsActions.healthCheck);

router.get('/misfits', misfitsActions.getMisfits);

module.exports = router;