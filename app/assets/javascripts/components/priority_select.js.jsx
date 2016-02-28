var PrioritySelect = React.createClass({
  change: function(e){
    this.props.onSelectChange({priority_id: e.target.value});
  },
  render: function(){
    // console.log(this.props.dictpriority);
    selectNodes = this.props.dictpriority.map(function(item){ 
      return ( 
        <PrioritySelectItem
          priority_id={item.id} 
          name={item.name} 
          key={item.id}> 
        </PrioritySelectItem> 
      ); 
    }); 
    if (this.props.view == "true") {
      return(
        <div className="form-group"> 
          <select id="priority_select_view" disabled="disabled" className="form-control"
            value={this.props.priority_id}>
            <option>Not selected</option>
            {selectNodes}
          </select>
        </div>
      );      
    }
    else {
      return(
        <div className="form-group"> 
          <select id="priority_select_edit" className="form-control" onChange={this.change} 
            value={this.props.priority_id}>
            <option>Select Priority</option>
            {selectNodes} 
          </select>
        </div>
      );      
    }

  }
});