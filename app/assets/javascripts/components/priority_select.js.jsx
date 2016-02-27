var PrioritySelect = React.createClass({
  change: function(e){
    newValue = e.target.value;
    this.props.onSelectChange({priority_id: newValue});
  },
  render: function(){
    if (this.props.view == "true") {
      return(
        <div className="form-group"> 
          <select id="priority_select_view" disabled="disabled" className="form-control" onChange={this.change} value={this.props.priority_id}>
            <option value="select">Select Priority</option>
            <option value="1">Low</option>
            <option value="3">High</option>
          </select>
        </div>
      );      
    }
    else {
      return(
        <div className="form-group"> 
          <select id="priority_select_edit" className="form-control" onChange={this.change} value={this.props.priority_id}>
            <option value="select">Select Priority</option>
            <option value="1">Low</option>
            <option value="3">High</option>
          </select>
        </div>
      );      
    }

  }
});