const router = require('express').Router();
const routesApi = require('./api');

router.use('/api', routesApi);

router.use((req, res) => res.send("Route is incorrect."));

module.exports = router;