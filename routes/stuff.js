const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createThing);
router.get('/:id' , stuffCtrl.getThing);
router.put('/:id', stuffCtrl.updateThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllThings);


module.exports = router;