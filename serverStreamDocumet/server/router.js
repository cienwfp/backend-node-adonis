var express = require('express')

var router = express.Router();

const DocumentController = require('../Controllers/documentController');

router.get('/document', DocumentController.index)
router.get('/document/:id', DocumentController.show)
router.put('/document/upload/:id', DocumentController.upload)
router.post('/document/new/:id', DocumentController.new)

module.exports = router
