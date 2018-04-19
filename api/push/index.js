const express = require('express');
const router = express.Router();

import { storeEndpoint } from './push.controller'


router.post('/storeEndpoint', storeEndpoint);

module.exports = router;