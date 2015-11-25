var React = require('react'),
    ReactDom = require('react-dom'),
    $ = require('jquery'),
    vis = require('vis'),
    Graph = require('../graph-network'),
    GraphEditor = require('../graph-editor'),
    ui = require('material-ui'),
    Snackbar = ui.Snackbar;

var GraphBox = React.createClass({
  fromNode: {},
  getInitialState: function() {
    var graph = {
      nodes: [],
      edges: []
    }
    nodes = new vis.DataSet();
    nodes.add(graph.nodes);
    edges = new vis.DataSet();
    edges.add(graph.edges);

    return {
      nodes: nodes,
      edges: edges,
      currentID: 7,
      networkData: null,

      fromNode: {},
      graphResult: ''
    }
  },
  addNewNode: function(nodeLabel, relationshipLabel, fromNode) {
    var curID = this.state.currentID;
    if (!nodeLabel) {
      this.refs.alertNodeLabelMissing.show();
      return false;
    }
    this.state.nodes.add({
      id: curID + 1,
      label: nodeLabel
    });

    if (fromNode && relationshipLabel) {
      this.state.edges.add({
        id: curID + 2,
        label: relationshipLabel,
        from: fromNode.id,
        to: curID + 1
      })
      this.setState({currentID: this.state.currentID + 2});
    } else {
      this.setState({currentID: this.state.currentID + 1});      
    }

    this.refs.alertNodeAdded.show();
  },
  saveGraph: function(){
    var nodes = JSON.stringify(this.state.nodes._data);
    var edges = JSON.stringify(this.state.edges._data);
    var com = this;
    console.log(nodes, edges);
    $.ajax({
      url: '/graph/save',
      type: 'POST',
      data: {edges: edges, nodes: nodes},
      success: function(res){
        var alertGraphResult = com.refs.alertGraphResult;
        if (res === 'success') {
          com.setState({
            graphResult: 'Graph saved successfully!'
          });
        } else {
          com.setState({
            graphResult: 'Graph saved failed!'
          });
        }
        alertGraphResult.show();
      },
      fail: function(){

      }
    });
  },
  selectNode: function(nodeData) {
    this.setState({
      fromNode: nodeData
    });
  },
  render: function() {
    var wrapperStyle = {height: '100%'};
    return(
      <div style={wrapperStyle}>
        <Graph 
          identifier="graph" 
          nodes={this.state.nodes} 
          edges={this.state.edges} 
          onInitGraph={this.initGraph}
          onSelectNode={this.selectNode} />
        <GraphEditor 
          ref="editor"
          onUpdateGraph={this.updateGraph} 
          onAddNewNode={this.addNewNode}
          onSaveGraph={this.saveGraph}
          fromNode={this.state.fromNode}/>
        
        <Snackbar
          message="Please give node a label before ad it"
          autoHideDuration={2000}
          ref="alertNodeLabelMissing"/>
        <Snackbar
          message="Node added successfully!"
          autoHideDuration={2000}
          ref="alertNodeAdded"/>
        <Snackbar
          message={this.state.graphResult}
          autoHideDuration={2000}
          ref="alertGraphResult"/>

      </div>
    )
  }
});

module.exports = GraphBox;