var express = require('express');
var router = express.Router();
var graphStore = require('../controllers/graph-store/store.js');

/* GET users listing. */
router.post('/save', function(req, res, next) {
	graphStore.save(req, res);
});

router.get('/save', function(req, res, next) {
	graphStore.save(req, res);
});

module.exports = router;
