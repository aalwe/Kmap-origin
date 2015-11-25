var db = require('./connect.js').db,
		_ = require('lodash'),
		Promise = require('bluebird');

var createNodes = function(nodes){
	var query = 'CREATE ',
			params = {};
	// return new Promise(function(resolve, reject){
		_.forEach(nodes, function(n, key){
			query += '(n' + key + ':graph_node { title: {title' + key + '} }),';
			params['title' + key] = n.label;
		});
		query = substr(query.length - 2, 1);
		query += ' RETURN *';
		console.log('QUERY', query, params);
		node = db.query(query, params, function(err, result){
			console.log(err);
			if (err) reject('ERROR OCCURED WHEN ADD NODES');
			console.log(result);
			resolve(result);
		});
	// });
};

var createRelationship = function(nodes, edges){

};

var basicStore = function(data){
	var nodes, edges;
	return new Promise(function(resolve, reject){
		resolve('ok');
		var nodes = null;
		if (data.nodes) {
			nodes = JSON.parse(data.nodes);
			edges = (data.edges) ? JSON.parse(data.edges) : {};
			createNodes(nodes);
			// createNodes(nodes).then(function(data){
			// 	console.log('resolve');
			// 	resolve('success');
			// }, function(err){
			// 	reject(err);
			// })
		} else {
			reject('Please insert nodes');
		}

		// node = db.query('CREATE (n:virtual_node {name: {name} }),(m1:virtual_node {name: "FAKEONE" }) return *', {name: data.name}, function(err, results){
		// 	if (err) reject(err);
		// 	resolve(results);
		// 	_.forEach(results, function(n, key){
		// 		console.log('HEREREE', n.m1._data.metadata);
		// 	});
		// });
	});
};

module.exports = {
	basic: basicStore
}