var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

//navagation bar routes
router.get('/', ctrlMain.index);
router.get('/eventlist', ctrlMain.eventList);
router.get('/eventdetail', ctrlMain.eventDetail);
router.get('/post', ctrlMain.postEvent);
router.get('/contact', ctrlMain.contact);

router.get('/login', ctrlMain.login);
router.get('/register', ctrlMain.register);
router.get('/userProfile', ctrlMain.profile);

module.exports = router;
