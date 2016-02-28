var PrioritySelectItem = React.createClass({
  render: function(){
    return(
      <option value={this.props.priority_id}>{this.props.name}</option>
    );      
  }
});