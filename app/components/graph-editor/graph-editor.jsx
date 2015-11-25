var React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    ui = require('material-ui'),
    Tabs = ui.Tabs,
    Tab = ui.Tab,
    TextField = ui.TextField,
    RaisedButton = ui.RaisedButton;

var standardActions = [
  { text: 'Cancel' },
  { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
];

injectTapEventPlugin();

var GraphEditor = React.createClass({
  getInitialState: function() {
    return {
      fromNode: '',
      relationshipLabel: '',
      nodeLabel: ''
    };
  },
  _relationChange: function(e){
    this.setState({
      relationshipLabel: e.target.value
    });
  },
  _newNodeLabelChange: function(e){
    this.setState({
      newNodeLabel: e.target.value
    });
  },
  addNewNode: function() {
    ('function' === typeof this.props.onAddNewNode) &&
      this.props.onAddNewNode(this.state.newNodeLabel, this.state.relationshipLabel, this.props.fromNode);
  },
  saveGraph: function() {
    ('function' === typeof this.props.onSaveGraph) &&
      this.props.onSaveGraph();
  },
  render: function() {
    var boxStyle = {width: '29%', float: 'left', height: '100%', borderRight: '1px solid #cecece'};
    return(
      <div style={boxStyle} className="graph-editor">
        <TextField hintText="From Node" disabled={true} value={this.props.fromNode.label}/>
        <TextField hintText="Relationship" className="left" value={this.state.relationshipLabel} onChange={this._relationChange}/>
        <TextField hintText="Node label" className="left" value={this.state.newNodeLabel} onChange={this._newNodeLabelChange}/>
        <RaisedButton style={{marginTop: '20px'}} label="Create new node" secondary={true} onClick={this.addNewNode}/>
        <RaisedButton style={{marginTop: '20px', display: 'block'}} label="Save graph" secondary={true} onClick={this.saveGraph}/>
      </div>
    )
  }

});

module.exports = GraphEditor;