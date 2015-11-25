var saveGraphDB = require('../database/save-graph.js');

function saveGraph(req, res) {
	var data = req.body;
	var store = saveGraphDB.basic(data);
	
	store.then(function(data){
		// console.log(data)
		res.status(200).send('success');
	}, function(err){
		// console.log(err);
		res.status(500).send(err);
	})

}

module.exports = {
	save: saveGraph
};