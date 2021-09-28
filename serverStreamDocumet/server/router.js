var express = require('express')

var router = express.Router();

const DocumentController = require('../Controllers/documentController');

router.get('/document', DocumentController.index)
router.get('/document/:id', DocumentController.show)

module.exports = router
