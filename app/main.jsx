var React = require('react'),
    ReactDom = require('react-dom'),
		GraphBox = require('./components/graph-box'),
		ui = require('material-ui'),
		AppBar = ui.AppBar;

require("./styles/normalize.less");
require("./styles/style.less");

var wrapperStyle = {height: '100%'};    
ReactDom.render(
	<div style={wrapperStyle}>
		<AppBar title="Kmap"/>
		<GraphBox />
	</div>
, document.getElementById('container')); 