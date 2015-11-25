var vis = require('vis');
var React = require('react');
var uuid = require('uuid');

var GraphNetwork = React.createClass({
  getDefaultProps: function () {
    return {
        graph: {},
        identifier:uuid.v4(),
        style:{width:"100%",height:"100%",position: 'relative'}
    };
  },

  getInitialState:function(){
    return {
      hierarchicalLayout:true
    };
  },
 
  render: function() {
    var wrapperStyle = {height: '100%', width: '70%', float: 'right'};
    return (
      <div style={wrapperStyle}>
        <div id={this.props.identifier} style={this.props.style}>
        </div>
      </div>
    )
  },

  componentDidMount: function (){
    this.initGraph();
  },

  initGraph:function(){
    // Container
    var container = document.getElementById(this.props.identifier),
        com = this;

    // Options
    var options = {
      autoResize: false,
      nodes: {
        shape: "circle"
      },
      physics: {
        enabled: true
      },
      configure: {
        enabled: true
      }

    };

    dataSet = {
      nodes: this.props.nodes,
      edges: this.props.edges
    };

    var network = new vis.Network(container, dataSet, options);

    // Select a node
    network.addEventListener('selectNode', function(object){
      ('function' === typeof com.props.onSelectNode) && 
        com.props.onSelectNode(dataSet.nodes.get(object.nodes[0]));
    });
  }
});
module.exports = GraphNetwork;