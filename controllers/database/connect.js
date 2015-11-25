var neo4j = require('neo4j');

module.exports = {
	db: new neo4j.GraphDatabase('http://neo4j:t0933763410anp@localhost:7474')
}