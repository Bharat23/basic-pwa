const express = require('express');
const router = express.Router();

const push = require('./push');

router.use('/push', push);

module.exports = router;