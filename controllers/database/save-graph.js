var db = require('./connect.js').db,
		_ = require('lodash'),
		Promise = require('bluebird');

var createNodes = function(nodes){
	var query = 'CREATE ',
			params = {};
	return new Promise(function(resolve, reject){
		_.forEach(nodes, function(n, key){
			query += '(n' + key + ':graph_node { title: {title' + key + '} }),';
			params['title' + key] = n.label;
		});
		query = query.substr(0, query.length - 1);
		query += ' RETURN *';
		console.log('QUERY', query, params);
		node = db.query(query, params, function(err, result){
			if (err) reject('ERROR OCCURED WHEN ADD NODES');
			var res = {};
			_.forEach(result[0], function(node, key){
				res[key] = node._data.metadata.id;
			})
			console.log(res);
			resolve(res);
		});
	});
};

var relationshipLabel = function(label){
	return label.replace(' ', '_');
}

var removeExceed = function(str, num){
	return str.substr(0, str.length - num);
}

var createRelationship = function(nodes, edges){
	console.log('NODE', nodes);
	console.log('EDGES', edges);
	var match = 'MATCH ',
			create = ' CREATE ',
			where = ' WHERE ',
			params = {};
	console.log(nodes);
	_.forEach(nodes, function(n, key){
		match += key + ',';
		where += 'id(' + key + ')=' + n + ' AND ';
	});
	return new Promise(function(resolve, reject){
		_.forEach(edges, function(n, key){
			console.log(n);
			create += '(' + ('n' + n.from) + ')-[:' + relationshipLabel(n.label) + ']->(' + ('n' + n.to) + '),'
			// params['title' + key] = n.label;
		});
		
		match = removeExceed(match, 1);
		create = removeExceed(create, 1);
		where = removeExceed(where, 5);
		query = match + where + create;
		query += ' RETURN *';

		console.log('QUERY', query);
		edge = db.query(query, params, function(err, result){
			if (err) reject('ERROR OCCURED WHEN ADD RELATIONSHIP');
			var res = {};
			console.log(result);
			_.forEach(result[0], function(node, key){
				res[key] = node._data.metadata.id;
			});
			resolve({
				nodes: nodes,
				edges: res
			});
		});
	});
};

var basicStore = function(data){
	var nodes, edges;
	return new Promise(function(resolve, reject){
		var nodes = null;
		if (data.nodes) {
			nodes = JSON.parse(data.nodes);
			edges = (data.edges) ? JSON.parse(data.edges) : {};
			createNodes(nodes)
				.then(function(data){
					createRelationship(data, edges)
						.then(function(finish){
							resolve('success');
						}, function(err){
							reject(err);
						});
				}, function(err){
					reject(err);
				})
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